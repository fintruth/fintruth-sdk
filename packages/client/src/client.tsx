import React from 'react'
import createBrowserHistory from 'history/createBrowserHistory'
import deepForceUpdate from 'react-deep-force-update'
import { ApolloProvider } from 'react-apollo'
import { Location } from 'history'
import { hydrate } from 'react-dom'
import { loadableReady } from '@loadable/component'

import Root from './components/root'
import { createApolloClient } from './apollo'
import { resolvers, typeDefs } from './store/partitions'

interface Position {
  scrollX: number
  scrollY: number
}

interface ScrollPositionsHistory {
  [key: string]: Position
}

const client = createApolloClient({
  defaults: window.__APOLLO_STATE__,
  preloadedCache: window.__APOLLO_CACHE__,
  resolvers,
  typeDefs,
})
const container = document.querySelector('#root')
const history = createBrowserHistory()
const scrollPositionsHistory: ScrollPositionsHistory = {}
let currentLocation = history.location
let appInstance: any

const onLocationChange = async (location: Location, action?: string) => {
  const isInitialRender = !action

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

    appInstance = hydrate(
      <ApolloProvider client={client}>
        <Root />
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
    if (__DEV__) {
      throw error
    }

    console.error(error)

    if (!isInitialRender && currentLocation.key === location.key) {
      window.location.reload()
    }
  }
}

history.listen(onLocationChange)
onLocationChange(currentLocation)

if (module.hot) {
  module.hot.accept('./components/root', () => {
    if (appInstance && appInstance.updater.isMounted(appInstance)) {
      deepForceUpdate(appInstance)
    }

    onLocationChange(currentLocation)
  })
}
