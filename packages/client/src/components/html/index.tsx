import { NormalizedCacheObject } from 'apollo-cache-inmemory'
import React from 'react'
import serialize from 'serialize-javascript'

type StateKey = keyof State

export interface HtmlProps extends React.HtmlHTMLAttributes<HTMLHtmlElement> {
  alternateLocales?: string[]
  children: string
  description?: string
  links?: React.ReactElement[]
  scripts?: React.ReactElement[]
  state?: State
  styles?: React.ReactElement[]
  title?: string
}

interface State {
  __APOLLO_CACHE__: NormalizedCacheObject
  __APOLLO_STATE__: Record<string, any>
}

const Html: React.FunctionComponent<HtmlProps> = ({
  alternateLocales = [],
  children,
  description = 'An opinionated boilerplate for web development',
  lang = 'en',
  links = [],
  scripts = [],
  state = { __APOLLO_CACHE__: {}, __APOLLO_STATE__: {} },
  styles,
  title = 'Fintruth Starter Kit',
  ...restProps
}: HtmlProps) => (
  <html lang={lang} {...restProps}>
    <head>
      <meta charSet="utf-8" />
      <title>{title}</title>
      <meta name="author" content="Fintruth LLC" />
      <meta name="description" content={description} />
      <meta name="theme-color" content="#000" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      {alternateLocales.map((locale) => (
        <meta key={locale} property="og:locale:alternate" content={locale} />
      ))}
      {links}
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link rel="manifest" href="/site.webmanifest" />
      <link
        rel="stylesheet"
        href="https://unpkg.com/@reach/menu-button@0.1.18/styles.css"
      />
      {styles}
    </head>
    <body>
      <noscript>
        You need to enable JavaScript to run this application.
      </noscript>
      <div id="root" dangerouslySetInnerHTML={{ __html: children }} />
      {Object.keys(state).map((key) => (
        <script
          dangerouslySetInnerHTML={{
            __html: `window.${key}=${serialize(state[key as StateKey])};`,
          }}
          key={key}
        />
      ))}
      {scripts}
    </body>
  </html>
)

export default Html
