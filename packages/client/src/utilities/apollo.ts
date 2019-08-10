import { ErrorLink } from 'apollo-link-error'
import {
  InMemoryCache,
  InMemoryCacheConfig as InMemoryCacheOptions,
  IntrospectionFragmentMatcher,
  IntrospectionResultData,
  defaultDataIdFromObject,
} from 'apollo-cache-inmemory'

import introspectionQueryResultData from '../fragment-types.json'

interface IntrospectionFragmentMatcherOptions {
  introspectionQueryResultData?: IntrospectionResultData
}

export const createErrorLink = () =>
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

export const createFragmentMatcher = (
  options: IntrospectionFragmentMatcherOptions = {}
) =>
  new IntrospectionFragmentMatcher({ introspectionQueryResultData, ...options })

export const createInMemoryCache = (options: InMemoryCacheOptions = {}) =>
  new InMemoryCache({
    dataIdFromObject: obj => {
      switch (obj.__typename) {
        default:
          return defaultDataIdFromObject(obj)
      }
    },
    freezeResults: true,
    ...options,
  })
