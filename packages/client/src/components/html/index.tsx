import React from 'react'
import serialize from 'serialize-javascript'
import { NormalizedCacheObject } from 'apollo-cache-inmemory'

import { black } from 'styles/variables'

interface Props {
  children: string
  description?: string
  links?: React.ReactElement<{}>[]
  scripts?: React.ReactElement<{}>[]
  state?: State
  styles: React.ReactElement<{}>[]
  title?: string
}

interface State {
  [key: string]: {}
  __APOLLO_CACHE__: NormalizedCacheObject
  __APOLLO_STATE__: {}
}

const Html: React.FunctionComponent<Props> = ({
  children,
  description = 'An opinionated boilerplate for web development',
  links = [],
  scripts = [],
  state = {
    __APOLLO_CACHE__: {},
    __APOLLO_STATE__: {},
  },
  styles,
  title = 'Fintruth Starter Kit',
}: Props) => (
  <html className="no-js" lang="en-US">
    <head>
      <meta charSet="utf-8" />
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      <title>{title}</title>
      <meta name="author" content="Fintruth LLC" />
      <meta name="description" content={description} />
      <meta name="theme-color" content={black} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      {links}
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      <link
        rel="stylesheet"
        href="https://unpkg.com/@reach/dialog@0.2.7/styles.css"
      />
      <link
        rel="stylesheet"
        href="https://unpkg.com/@reach/menu-button@0.1.16/styles.css"
      />
      {styles}
    </head>
    <body>
      <noscript>
        You need to enable JavaScript to run this application.
      </noscript>
      <div id="root" dangerouslySetInnerHTML={{ __html: children }} />
      {Object.keys(state).map(key => (
        <script
          dangerouslySetInnerHTML={{
            __html: `window.${key} = ${serialize(state[key])};`,
          }}
          key={key}
        />
      ))}
      {scripts}
    </body>
  </html>
)

export default Html
