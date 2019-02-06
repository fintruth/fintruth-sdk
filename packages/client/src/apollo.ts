import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { createUploadLink } from 'apollo-upload-client'

import createStore, { Options as StoreOptions } from './store'
import { createErrorLink } from './utilities/apollo'

interface Options {
  storeOptions: StoreOptions
}

export const createApolloClient = ({ storeOptions }: Options) => {
  const { cache, stateLink } = createStore(storeOptions)
  const links = [stateLink, createErrorLink()]

  if (__DEV__ && process.env.BROWSER) {
    links.push(require('apollo-link-logger').default)
  }

  links.push(
    createUploadLink({
      credentials: 'include',
      fetch: process.env.BROWSER ? window.fetch : require('node-fetch').default,
      uri: process.env.API_URI,
    })
  )

  return new ApolloClient({
    cache,
    link: ApolloLink.from(links),
    ssrForceFetchDelay: process.env.BROWSER ? 100 : undefined,
    ssrMode: !process.env.BROWSER,
  })
}
