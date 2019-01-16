import * as ApolloCacheInmemory from 'apollo-cache-inmemory'

declare global {
  interface Window {
    __APOLLO_CACHE__: ApolloCacheInmemory.NormalizedCacheObject
  }
}
