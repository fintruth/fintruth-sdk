import path from 'path'
import browserSync from 'browser-sync'
import errorOverlayMiddleware from 'react-dev-utils/errorOverlayMiddleware'
import express from 'express'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'

import webpackConfig from '../config/webpack.config'
import clean from './clean'
import run, { format } from './run'

const isRelease = process.argv.includes('--release')

const watchOptions = {}

const createCompilationPromise = (name, compiler, config) =>
  new Promise((resolve, reject) => {
    let timeStart = new Date()

    compiler.hooks.compile.tap(name, () => {
      timeStart = new Date()

      console.info(`[${format(timeStart)}] Compiling '${name}'`)
    })

    compiler.hooks.done.tap(name, stats => {
      console.info(stats.toString(config.stats))

      const timeEnd = new Date()
      const time = timeEnd.getTime() - timeStart.getTime()

      if (stats.hasErrors()) {
        console.info(
          `[${format(timeEnd)}] Failed to compile '${name}' after ${time} ms`
        )

        reject(new Error('Compilation failed!'))
      } else {
        console.info(
          `[${format(timeEnd)}] Finished '${name}' compilation after ${time} ms`
        )

        resolve(stats)
      }
    })
  })

let server

const start = async () => {
  if (server) {
    return server
  }

  server = express()
  server.use(errorOverlayMiddleware())
  server.use(express.static(path.resolve(__dirname, '../public')))

  const clientConfig = webpackConfig.find(({ name }) => name === 'client')
  const serverConfig = webpackConfig.find(({ name }) => name === 'server')

  clientConfig.entry.client = ['./scripts/lib/webpack-hot-dev-client']
    .concat(clientConfig.entry.client)
    .sort((a, b) => b.includes('polyfill') - a.includes('polyfill'))
  clientConfig.module.rules = clientConfig.module.rules.filter(
    ({ loader }) => loader !== 'null-loader'
  )
  clientConfig.output.chunkFilename = clientConfig.output.chunkFilename.replace(
    'chunkhash',
    'hash'
  )
  clientConfig.output.filename = clientConfig.output.filename.replace(
    'chunkhash',
    'hash'
  )
  clientConfig.plugins.push(new webpack.HotModuleReplacementPlugin())

  serverConfig.module.rules = serverConfig.module.rules.filter(
    ({ loader }) => loader !== 'null-loader'
  )
  serverConfig.output.hotUpdateChunkFilename =
    'updates/[id].[hash].hot-update.js'
  serverConfig.output.hotUpdateMainFilename = 'updates/[hash].hot-update.json'
  serverConfig.plugins.push(new webpack.HotModuleReplacementPlugin())

  await run(clean)

  const multiCompiler = webpack(webpackConfig)
  const clientCompiler = multiCompiler.compilers.find(
    ({ name }) => name === 'client'
  )
  const serverCompiler = multiCompiler.compilers.find(
    ({ name }) => name === 'server'
  )
  const clientPromise = createCompilationPromise(
    'client',
    clientCompiler,
    clientConfig
  )
  const serverPromise = createCompilationPromise(
    'server',
    serverCompiler,
    serverConfig
  )

  server.use(
    webpackDevMiddleware(clientCompiler, {
      logLevel: 'silent',
      publicPath: clientConfig.output.publicPath,
      watchOptions,
    })
  )
  server.use(webpackHotMiddleware(clientCompiler, { log: false }))

  let app
  let appPromise
  let appPromiseIsResolved = true
  let appPromiseResolve

  serverCompiler.hooks.compile.tap('server', () => {
    if (!appPromiseIsResolved) {
      return
    }

    appPromiseIsResolved = false
    appPromise = new Promise(resolve => (appPromiseResolve = resolve))
  })

  server.use((req, res) =>
    appPromise.then(() => app.handle(req, res)).catch(console.error)
  )

  const checkForUpdate = fromUpdate => {
    const hmrPrefix = '[\u001B[35mHMR\u001B[0m] '

    if (!app.hot) {
      throw new Error(`${hmrPrefix}Hot Module Replacement is disabled.`)
    }

    if (app.hot.status() !== 'idle') {
      return Promise.resolve()
    }

    return app.hot
      .check(true)
      .then(updatedModules => {
        if (!updatedModules) {
          if (fromUpdate) {
            console.info(`${hmrPrefix}Update applied.`)
          }

          return
        }

        if (updatedModules.length === 0) {
          return console.info(`${hmrPrefix}Nothing hot updated.`)
        } else {
          console.info(`${hmrPrefix}Updated modules:`)

          updatedModules.forEach(moduleId =>
            console.info(`${hmrPrefix} - ${moduleId}`)
          )

          return checkForUpdate(true)
        }
      })
      .catch(error => {
        if (['abort', 'fail'].includes(app.hot.status())) {
          console.warn(`${hmrPrefix}Cannot apply update.`)

          delete require.cache[require.resolve('../build/server')]

          app = require('../build/server').default

          console.warn(`${hmrPrefix}App has been reloaded.`)
        } else {
          console.warn(
            `${hmrPrefix}Update failed: ${error.stack || error.message}`
          )
        }
      })
  }

  serverCompiler.watch(watchOptions, async (err, stats) => {
    if (app && !err && !stats.hasErrors()) {
      try {
        await checkForUpdate()

        appPromiseIsResolved = true

        appPromiseResolve()
      } catch (error) {
        console.warn(error.stack || error.message)
      }
    }
  })

  await clientPromise
  await serverPromise

  const timeStart = new Date()

  console.info(`[${format(timeStart)}] Launching server...`)

  app = require('../build/server').default
  appPromiseIsResolved = true

  appPromiseResolve()

  await new Promise((resolve, reject) =>
    browserSync.create().init(
      {
        middleware: [server],
        open: !process.argv.includes('--silent'),
        server: 'build/server.js',
        ...(isRelease ? { notify: false, ui: false } : {}),
      },
      (error, bs) => (error ? reject(error) : resolve(bs))
    )
  )

  const timeEnd = new Date()
  const time = timeEnd.getTime() - timeStart.getTime()

  console.info(`[${format(timeEnd)}] Server launched after ${time} ms`)

  return server
}

export default start
