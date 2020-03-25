import { join } from 'path'
import { ApolloProvider } from '@apollo/react-hooks'
import { renderToStringWithData } from '@apollo/react-ssr'
import { ChunkExtractor, ChunkExtractorManager } from '@loadable/server'
import { ServerLocation, isRedirect } from '@reach/router'
import { createUploadLink } from 'apollo-upload-client'
import { ApolloServer } from 'apollo-server-express'
import bodyParser from 'body-parser'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express, { Express, NextFunction, Request, Response } from 'express'
import requestLanguage from 'express-request-language'
import { Styles } from 'isomorphic-style-loader'
import StyleContext from 'isomorphic-style-loader/StyleContext'
import fetch from 'node-fetch'
import PrettyError from 'pretty-error'
import React from 'react'
import { renderToStaticMarkup, renderToString } from 'react-dom/server'
import { IntlProvider } from 'react-intl'
import { ServerStyleSheet, StyleSheetManager } from 'styled-components'

import schema from './api/schema'
import { Context } from './common'
import Html from './components/html'
import Root from './components/root'
import Fault from './routes/fault'
import { Defaults, defaults as baseDefaults, resolvers } from './store'
import { createApolloClient, createErrorLink } from './utils/apollo'
import { locales, port } from './config'

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason)

  return process.exit(1)
})

global.navigator = global.navigator || { userAgent: 'all' }

const app: Express = express()
const prettyError = new PrettyError()
const server = new ApolloServer({
  context: ({ req, res }): Context => ({ locale: req.language, res }),
  debug: __IS_DEV__,
  playground: __IS_DEV__,
  schema,
})

prettyError.skipNodeFiles()
prettyError.skipPackage('express')

app
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(compression())
  .use(cookieParser())
  .use(cors())
  .use(express.static(join(__dirname, 'public')))
  .use(
    requestLanguage({
      cookie: { name: 'lang', url: '/lang/{language}' },
      languages: locales,
      queryName: 'lang',
    })
  )
  .use(server.getMiddleware({ cors: false, path: '/api' }))

app.get('*', async (req: Request, res: Response, next: NextFunction) => {
  const css = new Set()
  const defaults: Defaults = {
    ...baseDefaults,
    currentLocale: locales.includes(req.language) ? req.language : 'en',
    locales,
  }

  const alternateLocales = locales.filter((locale) => locale !== req.language)
  const client = createApolloClient({
    defaults,
    links: [
      createErrorLink(),
      createUploadLink({
        credentials: 'include',
        fetch: (fetch as unknown) as WindowOrWorkerGlobalScope['fetch'],
        uri: process.env.API_URI,
      }),
    ],
    resolvers,
    ssrMode: true,
  })
  const extractor = new ChunkExtractor({
    entrypoints: 'client',
    statsFile: join(__dirname, 'stats.json'),
  })
  const sheet = new ServerStyleSheet()

  const insertCss = (...styles: Styles[]) => {
    const removeCss = styles.map(({ _getCss, _insertCss }) => {
      css.add(_getCss())

      return _insertCss()
    })

    return () => removeCss.forEach((dispose) => dispose())
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
        alternateLocales={alternateLocales}
        lang={req.language}
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

app.use((err: any, req: Request, res: Response) => {
  const sheet = new ServerStyleSheet()

  const root = renderToString(
    <StyleSheetManager sheet={sheet.instance}>
      <IntlProvider defaultLocale="en" locale={req.language}>
        <Fault error={err} />
      </IntlProvider>
    </StyleSheetManager>
  )

  const html = renderToStaticMarkup(
    <Html
      description={err.message}
      lang={req.language}
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
