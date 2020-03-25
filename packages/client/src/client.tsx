import { ApolloProvider } from '@apollo/react-hooks'
import { loadableReady } from '@loadable/component'
import {
  HistoryActionType,
  HistoryLocation,
  HistorySource,
  createHistory,
} from '@reach/router'
import { createUploadLink } from 'apollo-upload-client'
import { Styles } from 'isomorphic-style-loader'
import StyleContext from 'isomorphic-style-loader/StyleContext'
import React from 'react'
import deepForceUpdate from 'react-deep-force-update'
import { hydrate, render } from 'react-dom'

import Root from './components/root'
import { resolvers, typeDefs } from './store'
import { createApolloClient, createErrorLink } from './utils/apollo'

interface HistoryMetadata {
  location: HistoryLocation
  action?: HistoryActionType
}

interface Position {
  scrollX: number
  scrollY: number
}

const client = createApolloClient({
  defaults: window.__APOLLO_STATE__,
  links: [
    createErrorLink(),
    ...(__IS_DEV__ ? [require('apollo-link-logger').default] : []),
    createUploadLink({ credentials: 'include', uri: process.env.API_URI }),
  ],
  preloadedCache: window.__APOLLO_CACHE__,
  resolvers,
  ssrForceFetchDelay: 100,
  typeDefs,
})
const container = document.querySelector('#root')
const history = createHistory((window as unknown) as HistorySource)
const scrollPositionsHistory: Record<string, Position> = {}
let currentLocation = history.location
let root: React.ComponentType | void

const insertCss = (...styles: Styles[]) => {
  const removeCss = styles.map(({ _insertCss }) => _insertCss())

  return () => removeCss.forEach((dispose) => dispose())
}

const onLocationChange = async ({ action, location }: HistoryMetadata) => {
  const isInitialRender = !action
  const renderOrHydrate = action ? render : hydrate

  // Remember the latest scroll position for the previous location
  if (currentLocation.key) {
    scrollPositionsHistory[currentLocation.key] = {
      scrollX: window.pageXOffset,
      scrollY: window.pageYOffset,
    }
  }

  // Delete stored scroll position for next page if any
  if (location.key && action === 'PUSH') {
    delete scrollPositionsHistory[location.key]
  }

  currentLocation = location

  try {
    if (currentLocation.key !== location.key) {
      return
    }

    await loadableReady()

    root = renderOrHydrate(
      <ApolloProvider client={client}>
        <StyleContext.Provider value={{ insertCss }}>
          <Root />
        </StyleContext.Provider>
      </ApolloProvider>,
      container,
      () => {
        if (isInitialRender) {
          if (window.history && 'scrollRestoration' in window.history) {
            window.history.scrollRestoration = 'manual'
          }

          return
        }

        const pos = location.key ? scrollPositionsHistory[location.key] : null
        let scrollX = 0
        let scrollY = 0

        if (pos) {
          scrollX = pos.scrollX
          scrollY = pos.scrollY
        } else {
          if (location.hash) {
            const target = document.querySelector(location.hash)

            if (target) {
              scrollY = window.pageYOffset + target.getBoundingClientRect().top
            }
          }
        }

        window.scrollTo(scrollX, scrollY)
      }
    )
  } catch (error) {
    if (__IS_DEV__) {
      throw error
    }

    console.error(error)

    if (!isInitialRender && currentLocation.key === location.key) {
      window.location.reload()
    }
  }
}

history.listen(onLocationChange) // eslint-disable-line @typescript-eslint/no-misused-promises
onLocationChange({ location: currentLocation })

if (module.hot) {
  module.hot.accept('./components/root', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore TS2339
    if (root && root.updater.isMounted(root)) {
      deepForceUpdate(root)
    }

    onLocationChange({ location: currentLocation })
  })
}
