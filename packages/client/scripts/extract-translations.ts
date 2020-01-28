import { join, resolve } from 'path'
import { PluginItem, loadPartialConfig, transformFileAsync } from '@babel/core'
import { ExtractedMessageDescriptor } from 'babel-plugin-react-intl'
import chokidar from 'chokidar'

import { locales } from '../src/config'
import { Translation } from '../src/common'
import { readDir, readFile, writeFile } from './utils/file-system'

type Translations = Record<string, Translation>

const extractedTranslations: Record<string, ExtractedMessageDescriptor[]> = {}

const rootDir = resolve(__dirname, '..')

const env = process.env.ENV || 'development'
const isProd = /^prod(uction)?$/i.test(env)
const isStaging = /^stag(e|ing)$/i.test(env)

const isRelease = isProd || isStaging || process.argv.includes('--release')
const isWatch = process.argv.includes('--watch')

const mergeToFile = async (
  locale: string,
  newTranslations: Translations,
  toBuild: boolean
) => {
  const originalTranslations: Translations = {}
  const file = join(rootDir, `src/i18n/translations/${locale}.json`)

  try {
    const data: Translation[] = JSON.parse((await readFile(file)) as string)

    data.forEach(translation => {
      originalTranslations[translation.id] = translation

      delete originalTranslations[translation.id].files
    })
  } catch (error) {
    if (error.code !== 'ENOENT') {
      throw error
    }
  }

  Object.keys(newTranslations).forEach(id => {
    const { defaultMessage = '', description = '', message = '' } =
      originalTranslations[id] || {}

    originalTranslations[id] = {
      id,
      message,
      defaultMessage: newTranslations[id].defaultMessage || defaultMessage,
      description: newTranslations[id].description || description,
      files: newTranslations[id].files,
    }
  })

  const updatedTranslations = Object.keys(originalTranslations)
    .map(id => originalTranslations[id])
    .filter(({ files, message }) => files || message)
    .sort((a, b) => a.id.localeCompare(b.id))
  const data = `${JSON.stringify(updatedTranslations, null, 2)}\n`

  await writeFile(file, data)

  if (toBuild) {
    await writeFile(join(rootDir, `build/translations/${locale}.json`), data)
  }
}

const processFile = async (file: string, presets: PluginItem[]) => {
  const { metadata: { 'react-intl': { messages = [] } = {} } = {} } =
    (await transformFileAsync(file, { plugins: ['react-intl'], presets })) || {}
  const posixFile = file.replace(/\\/g, '/')

  if (messages.length > 0) {
    extractedTranslations[posixFile] = messages.sort((a, b) =>
      a.id.localeCompare(b.id)
    )
  } else {
    delete extractedTranslations[posixFile]
  }
}

const updateTranslations = async (toBuild = false) => {
  const newTranslations: Translations = {}

  Object.keys(extractedTranslations).forEach(file =>
    extractedTranslations[file].forEach(
      ({ defaultMessage, description, id }) => {
        const { files = [], ...translation } = newTranslations[id] || {}

        newTranslations[id] = {
          id,
          message: translation.message || '',
          defaultMessage: defaultMessage || translation.defaultMessage || '',
          description: description || translation.description || '',
          files: [...files, file].sort((a, b) => a.localeCompare(b)),
        }
      }
    )
  )

  await Promise.all(
    locales.map(locale => mergeToFile(locale, newTranslations, toBuild))
  )
}

const extractTranslations = async () => {
  const { options: { presets = [] } = {} } =
    loadPartialConfig({
      envName: isRelease ? 'production' : 'development',
      filename: '',
    }) || {}
  const files = await readDir('src/**/*.ts?(x)', {
    ignore: 'src/**/?(*.)test.ts?(x)',
    nosort: true,
  })

  await Promise.all(files.map(file => processFile(file, presets || [])))
  await updateTranslations()

  if (isWatch) {
    const watcher = chokidar.watch('src/**/*.ts?(x)', {
      ignoreInitial: true,
      ignored: 'src/**/?(*.)test.ts?(x)',
    })

    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    watcher.on('changed', async (file: string) => {
      await processFile(file, presets || [])
      await updateTranslations(true)
    })
  }
}

export default extractTranslations
