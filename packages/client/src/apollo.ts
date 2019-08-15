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

  if (__IS_DEV__ && __IS_BROWSER__) {
    links.push(require('apollo-link-logger').default)
  }

  links.push(
    createUploadLink({
      credentials: 'include',
      fetch: __IS_BROWSER__ ? fetch : require('node-fetch').default,
      uri: process.env.API_URI,
    })
  )

  return new ApolloClient({
    assumeImmutableResults: true,
    cache,
    link: ApolloLink.from(links),
    ssrForceFetchDelay: __IS_BROWSER__ ? 100 : undefined,
    ssrMode: !__IS_BROWSER__,
    ...options,
  })
}
