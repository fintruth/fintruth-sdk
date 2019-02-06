import { ApolloLink } from 'apollo-link'
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory' // eslint-disable-line import/named
import { withClientState } from 'apollo-link-state'

import { createInMemoryCache } from 'utilities/apollo'

export interface Options {
  defaults: {}
  preloadedCache?: NormalizedCacheObject
  resolvers: {}
  typeDefs?: string
}

interface Store {
  cache: InMemoryCache
  stateLink: ApolloLink
}

const createStore = ({
  defaults,
  preloadedCache,
  resolvers,
  typeDefs,
}: Options): Store => {
  let cache = createInMemoryCache()

  const stateLink = withClientState({ cache, defaults, resolvers, typeDefs })

  if (preloadedCache) {
    cache = cache.restore(preloadedCache)
  }

  return { cache, stateLink }
}

export default createStore
