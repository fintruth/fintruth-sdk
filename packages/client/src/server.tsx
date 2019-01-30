import path from 'path'
import PrettyError from 'pretty-error'
import React from 'react'
import bodyParser from 'body-parser'
import compression from 'compression'
import cors from 'cors'
import express, { Express, NextFunction, Request, Response } from 'express'
import { ChunkExtractor, ChunkExtractorManager } from '@loadable/server'
import { ServerLocation, isRedirect } from '@reach/router'
import { ServerStyleSheet, StyleSheetManager } from 'styled-components'
import { renderToStaticMarkup, renderToString } from 'react-dom/server'
import { renderToStringWithData } from 'react-apollo'
import Fault from './routes/fault'
import Html from './components/html'
import Root from './components/root'
import { createApolloClient } from './apollo'
import { defaults } from './store/partitions'

process.on('unhandledRejection', () => {
  process.exit(1)
})

global.navigator = global.navigator || { userAgent: 'all' }

const app: Express = express()
const prettyError = new PrettyError()

app
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(compression())
  .use(cors())
  .use(express.static(path.resolve(__dirname, 'public')))

app.get('*', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const client = createApolloClient({
      storeOptions: { defaults, resolvers: {} },
    })
    const extractor = new ChunkExtractor({
      entrypoints: 'client',
      statsFile: path.resolve(__dirname, 'stats.json'),
    })
    const sheet = new ServerStyleSheet()

    const root = await renderToStringWithData(
      <ChunkExtractorManager extractor={extractor}>
        <StyleSheetManager sheet={sheet.instance}>
          <ServerLocation url={req.url}>
            <Root client={client} />
          </ServerLocation>
        </StyleSheetManager>
      </ChunkExtractorManager>
    )

    const html = renderToStaticMarkup(
      <Html
        links={extractor.getLinkElements()}
        scripts={extractor.getScriptElements()}
        state={{
          __APOLLO_CACHE__: client.extract(),
          __APOLLO_STATE__: defaults,
        }}
        styles={sheet.getStyleElement()}
      >
        {root}
      </Html>
    )

    res.status(200)

    return res.send(`<!doctype html>${html}`)
  } catch (error) {
    return isRedirect(error) ? res.redirect(error.uri) : next(error)
  }
})

app.use((err: any, _: Request, res: Response) => {
  const sheet = new ServerStyleSheet()

  const root = renderToString(
    <StyleSheetManager sheet={sheet.instance}>
      <Fault error={err} />
    </StyleSheetManager>
  )

  const html = renderToStaticMarkup(
    <Html
      description={err.message}
      styles={sheet.getStyleElement()}
      title="Internal Server Error"
    >
      {root}
    </Html>
  )

  console.error(prettyError.render(err))
  res.status(err.status || 500)

  return res.send(`<!doctype html>${html}`)
})

prettyError.skipNodeFiles()
prettyError.skipPackage('express')

if (module.hot) {
  app.hot = module.hot
  module.hot.accept('components/root', () => {})
} else {
  app.listen(process.env.PORT, () =>
    console.info(
      `The server is running at http://localhost:${process.env.PORT}/`
    )
  )
}

export default app
