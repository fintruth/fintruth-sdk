import { NormalizedCacheObject } from 'apollo-cache-inmemory' // eslint-disable-line import/named

declare global {
  interface Window {
    __APOLLO_CACHE__: NormalizedCacheObject
  }
}
