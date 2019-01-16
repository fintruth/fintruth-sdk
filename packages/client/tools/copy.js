import path from 'path'
import chokidar from 'chokidar'
import { format } from './run'
import { writeFile, copyFile, makeDir, copyDir, cleanDir } from './lib/fs'
import { dependencies, engines } from '../package.json'

const copy = async () => {
  await makeDir('build')
  await Promise.all([
    writeFile(
      'build/package.json',
      JSON.stringify(
        {
          dependencies,
          engines,
          private: true,
          scripts: { start: 'node server.js' },
        },
        null,
        2
      )
    ),
    copyFile('../../yarn.lock', 'build/yarn.lock'),
    copyDir('public', 'build/public'),
  ])

  if (process.argv.includes('--watch')) {
    const watcher = chokidar.watch(['public/**/*'], { ignoreInitial: true })

    watcher.on('all', async (event, filePath) => {
      const start = new Date()
      const src = path.relative('./', filePath)
      const dist = path.join(
        'build/',
        src.startsWith('src') ? path.relative('src', src) : src
      )

      switch (event) {
        case 'add':
        case 'change':
          await makeDir(path.dirname(dist))
          await copyFile(filePath, dist)
          break
        case 'unlink':
        case 'unlinkDir':
          cleanDir(dist, { nosort: true, dot: true })
          break
        default:
          return
      }

      const end = new Date()
      const time = end.getTime() - start.getTime()

      console.info(`[${format(end)}] ${event} '${dist}' after ${time} ms`)
    })
  }
}

export default copy
