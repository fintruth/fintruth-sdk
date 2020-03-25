import fs, { WriteFileOptions } from 'fs'
import { dirname, resolve } from 'path'
import { promisify } from 'util'
import glob, { IOptions as GlobOptions } from 'glob'
import rimraf from 'rimraf'

type CopyDirOptions = Omit<GlobOptions, 'cwd'>

type MakeDirOptions =
  | null
  | number
  | string
  | {
      mode?: number
      recursive?: boolean
    }

type ReadFileOptions =
  | null
  | string
  | {
      encoding?: null | string
      flag?: string
    }

export const cleanDir = (path: string, options?: GlobOptions) =>
  promisify(rimraf)(path, { glob: options })

export const copyFile = (source: string, target: string) =>
  new Promise((resolve, reject) => {
    const readStream = fs.createReadStream(source)
    const writeStream = fs.createWriteStream(target)
    let callbackCalled = false

    const done = (error: any) => {
      if (!callbackCalled) {
        callbackCalled = true

        return error ? reject(error) : resolve()
      }
    }

    readStream.on('error', done)
    writeStream.on('close', done)
    writeStream.on('error', done)
    readStream.pipe(writeStream)
  })

export const makeDir = (
  path: string,
  options: MakeDirOptions = { recursive: true }
) => promisify(fs.mkdir)(path, options)

export const readDir = (path: string, options?: GlobOptions) =>
  promisify(glob)(path, options)

export const copyDir = async (
  source: string,
  target: string,
  { dot = true, nosort = true, ...options }: CopyDirOptions = {}
) => {
  const dirs = await readDir('**/*.*', { cwd: source, dot, nosort, ...options })

  await Promise.all(
    dirs.map(async (dir) => {
      const from = resolve(source, dir)
      const to = resolve(target, dir)

      await makeDir(dirname(to))
      await copyFile(from, to)
    })
  )
}

export const readFile = (path: string, options: ReadFileOptions = 'utf-8') =>
  promisify(fs.readFile)(path, options)

export const writeFile = (
  path: string,
  data: any,
  options: WriteFileOptions = 'utf-8'
) => promisify(fs.writeFile)(path, data, options)
