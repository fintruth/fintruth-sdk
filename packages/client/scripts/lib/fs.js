import fs from 'fs'
import path from 'path'
import glob from 'glob'
import mkdirp from 'mkdirp'
import rimraf from 'rimraf'

export const cleanDir = (pattern, options) =>
  new Promise((resolve, reject) =>
    rimraf(pattern, { glob: options }, (error, result) =>
      error ? reject(error) : resolve(result)
    )
  )

export const copyFile = (source, target) =>
  new Promise((resolve, reject) => {
    let callbackCalled = false

    const done = error => {
      if (!callbackCalled) {
        callbackCalled = true

        return error ? reject(error) : resolve()
      }
    }

    const read = fs.createReadStream(source)
    const write = fs.createWriteStream(target)

    read.on('error', done)
    write.on('close', done)
    write.on('error', done)
    read.pipe(write)
  })

export const makeDir = name =>
  new Promise((resolve, reject) =>
    mkdirp(name, error => (error ? reject(error) : resolve()))
  )

export const readDir = (pattern, options) =>
  new Promise((resolve, reject) =>
    glob(pattern, options, (error, result) =>
      error ? reject(error) : resolve(result)
    )
  )

export const copyDir = async (source, target) => {
  const dirs = await readDir('**/*.*', { cwd: source, dot: true, nosort: true })

  await Promise.all(
    dirs.map(async dir => {
      const from = path.resolve(source, dir)
      const to = path.resolve(target, dir)

      await makeDir(path.dirname(to))
      await copyFile(from, to)
    })
  )
}

export const readFile = file =>
  new Promise((resolve, reject) =>
    fs.readFile(file, 'utf8', (error, data) =>
      error ? reject(error) : resolve(data)
    )
  )

export const renameFile = (source, target) =>
  new Promise((resolve, reject) =>
    fs.rename(source, target, error => (error ? reject(error) : resolve()))
  )

export const moveDir = async (source, target) => {
  const dirs = await readDir('**/*.*', { cwd: source, dot: true, nosort: true })

  await Promise.all(
    dirs.map(async dir => {
      const from = path.resolve(source, dir)
      const to = path.resolve(target, dir)

      await makeDir(path.dirname(to))
      await renameFile(from, to)
    })
  )
}

export const writeFile = (file, contents) =>
  new Promise((resolve, reject) =>
    fs.writeFile(file, contents, 'utf8', error =>
      error ? reject(error) : resolve()
    )
  )
