import { ApolloProvider } from '@apollo/react-hooks'
import { renderToStringWithData } from '@apollo/react-ssr'
import { ChunkExtractor, ChunkExtractorManager } from '@loadable/server'
import { ServerLocation, isRedirect } from '@reach/router'
import bodyParser from 'body-parser'
import compression from 'compression'
import cors from 'cors'
import express, { Express, NextFunction, Request, Response } from 'express'
import { Styles } from 'isomorphic-style-loader'
import StyleContext from 'isomorphic-style-loader/StyleContext'
import { resolve } from 'path'
import PrettyError from 'pretty-error'
import React from 'react'
import { renderToStaticMarkup, renderToString } from 'react-dom/server'
import { ServerStyleSheet, StyleSheetManager } from 'styled-components'

import Html from './components/html'
import Root from './components/root'
import Fault from './routes/fault'
import { defaults } from './store/partitions'
import { createApolloClient } from './apollo'
import { port } from './config'

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason)

  return process.exit(1)
})

global.navigator = global.navigator || { userAgent: 'all' }

const app: Express = express()
const prettyError = new PrettyError()

prettyError.skipNodeFiles()
prettyError.skipPackage('express')

app
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(compression())
  .use(cors())
  .use(express.static(resolve(__dirname, 'public')))

app.get('*', async (req: Request, res: Response, next: NextFunction) => {
  const client = createApolloClient({ defaults, resolvers: {} })
  const css = new Set()
  const extractor = new ChunkExtractor({
    entrypoints: 'client',
    statsFile: resolve(__dirname, 'stats.json'),
  })
  const sheet = new ServerStyleSheet()

  const insertCss = (...styles: Styles[]) => {
    const removeCss = styles.map(({ _getCss, _insertCss }) => {
      css.add(_getCss())

      return _insertCss()
    })

    return () => removeCss.forEach(dispose => dispose())
  }

  try {
    const root = await renderToStringWithData(
      <ChunkExtractorManager extractor={extractor}>
        <StyleContext.Provider value={{ insertCss }}>
          <StyleSheetManager sheet={sheet.instance}>
            <ServerLocation url={req.url}>
              <ApolloProvider client={client}>
                <Root />
              </ApolloProvider>
            </ServerLocation>
          </StyleSheetManager>
        </StyleContext.Provider>
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
        styles={[
          <style
            key="css"
            dangerouslySetInnerHTML={{ __html: [...css].join(', ') }}
          />,
          ...sheet.getStyleElement(),
        ]}
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

if (module.hot) {
  app.hot = module.hot

  module.hot.accept('./components/root')
} else {
  app.listen(port, () =>
    console.info(`The server is running at http://localhost:${port}`)
  )
}

export default app
