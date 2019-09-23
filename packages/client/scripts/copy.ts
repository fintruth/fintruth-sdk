import chokidar from 'chokidar'
import { dirname, join, relative } from 'path'

import { writeFile, copyFile, makeDir, copyDir, cleanDir } from './lib/fs'
import { format } from './run'
import { dependencies, engines, name, version } from '../package.json'

const config = JSON.stringify(
  {
    name,
    version,
    scripts: { start: 'node server.js' },
    dependencies,
    engines,
    private: true,
  },
  null,
  2
)

const isWatch = process.argv.includes('--watch')

const copy = async () => {
  await makeDir('build')

  await Promise.all([
    copyDir('public', 'build/public'),
    copyDir('src/translations/locales', 'build/locales'),
    copyFile('../../yarn.lock', 'build/yarn.lock'),
    writeFile('build/package.json', config),
  ])

  if (isWatch) {
    const watcher = chokidar.watch(
      ['public/**/*', 'src/translations/locales/**/*'],
      { ignoreInitial: true }
    )

    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    watcher.on('all', async (eventName, path) => {
      const start = new Date()
      const src = relative('./', path)
      const dist = join(
        'build/',
        src.startsWith('src') ? relative('src', src) : src
      )

      if (eventName === 'add' || eventName === 'change') {
        await makeDir(dirname(dist))
        await copyFile(path, dist)
      } else if (eventName === 'unlink' || eventName === 'unlinkDir') {
        cleanDir(dist, { dot: true, nosort: true })
      } else {
        return
      }

      const end = new Date()
      const time = end.getTime() - start.getTime()

      console.info(`[${format(end)}] ${eventName} '${dist}' after ${time} ms`)
    })
  }
}

export default copy
