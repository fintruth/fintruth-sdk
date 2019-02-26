import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { NormalizedCacheObject } from 'apollo-cache-inmemory' // eslint-disable-line import/named
import { createUploadLink } from 'apollo-upload-client'

import { createErrorLink, createInMemoryCache } from './utilities/apollo'

interface Options {
  defaults: {}
  preloadedCache?: NormalizedCacheObject
  resolvers: {}
  typeDefs?: string
}

export const createApolloClient = ({
  defaults,
  preloadedCache,
  resolvers,
  typeDefs,
}: Options) => {
  const links: ApolloLink[] = [createErrorLink()]
  let cache = createInMemoryCache()

  if (preloadedCache) {
    cache = cache.restore(preloadedCache)
  }

  if (defaults) {
    cache.writeData({ data: defaults })
  }

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
    resolvers,
    ssrForceFetchDelay: process.env.BROWSER ? 100 : undefined,
    ssrMode: !process.env.BROWSER,
    typeDefs,
  })
}
