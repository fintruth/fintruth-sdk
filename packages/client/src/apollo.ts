import { NormalizedCacheObject } from 'apollo-cache-inmemory'
import { ApolloClient, ApolloClientOptions } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { ErrorLink } from 'apollo-link-error'
import { createUploadLink } from 'apollo-upload-client'

import { createInMemoryCache } from './utils/apollo'

interface Options extends Partial<ApolloClientOptions<NormalizedCacheObject>> {
  defaults?: {}
  preloadedCache?: NormalizedCacheObject
}

const createErrorLink = () =>
  new ErrorLink(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.map(({ locations, message, path }) =>
        console.warn(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        )
      )
    }

    if (networkError) {
      console.warn(`[Network error]: ${networkError}`)
    }
  })

export const createApolloClient = ({
  defaults,
  preloadedCache,
  ...options
}: Options = {}) => {
  const links: ApolloLink[] = [createErrorLink()]
  let cache = createInMemoryCache()

  if (preloadedCache) {
    cache = cache.restore(preloadedCache)
  }

  if (defaults) {
    cache.writeData({ data: defaults })
  }

  if (__IS_DEV__ && process.env.BROWSER_ENV) {
    links.push(require('apollo-link-logger').default)
  }

  links.push(
    createUploadLink({
      credentials: 'include',
      fetch: process.env.BROWSER_ENV ? fetch : require('node-fetch').default,
      uri: process.env.API_URI,
    })
  )

  return new ApolloClient({
    assumeImmutableResults: true,
    cache,
    link: ApolloLink.from(links),
    ssrForceFetchDelay: process.env.BROWSER_ENV ? 100 : undefined,
    ssrMode: !process.env.BROWSER_ENV,
    ...options,
  })
}
