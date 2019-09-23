import { ApolloClient, ApolloClientOptions } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { NormalizedCacheObject } from 'apollo-cache-inmemory'
import { createUploadLink } from 'apollo-upload-client'

import {
  createErrorLink,
  createFragmentMatcher,
  createInMemoryCache,
} from './utils/apollo'

interface Options extends Partial<ApolloClientOptions<NormalizedCacheObject>> {
  defaults?: {}
  preloadedCache?: NormalizedCacheObject
}

const fragmentMatcher = createFragmentMatcher()

export const createApolloClient = ({
  defaults,
  preloadedCache,
  ...options
}: Options = {}) => {
  const links: ApolloLink[] = [createErrorLink()]
  let cache = createInMemoryCache({ fragmentMatcher })

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
