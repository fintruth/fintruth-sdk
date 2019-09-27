import {
  InMemoryCache,
  InMemoryCacheConfig as InMemoryCacheOptions,
  IntrospectionFragmentMatcher,
  IntrospectionResultData,
  defaultDataIdFromObject,
} from 'apollo-cache-inmemory'
import { hasPath } from 'ramda'

import introspectionQueryResultData from '../fragment-types.json'

interface IntrospectionFragmentMatcherOptions {
  introspectionQueryResultData?: IntrospectionResultData
}

const createFragmentMatcher = (
  options: IntrospectionFragmentMatcherOptions = {}
) =>
  new IntrospectionFragmentMatcher({ introspectionQueryResultData, ...options })

export const createInMemoryCache = (options: InMemoryCacheOptions = {}) =>
  new InMemoryCache({
    dataIdFromObject: value => {
      switch (value.__typename) {
        default:
          return defaultDataIdFromObject(value)
      }
    },
    freezeResults: true,
    fragmentMatcher: createFragmentMatcher(),
    ...options,
  })

export const hasResponseError = <TData = {}>(data: TData | {} = {}) =>
  hasPath(['response', 'error'], data)
