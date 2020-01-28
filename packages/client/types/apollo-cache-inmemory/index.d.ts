import { NormalizedCacheObject } from 'apollo-cache-inmemory'

declare global {
  interface Window {
    __APOLLO_CACHE__: NormalizedCacheObject
  }
}
