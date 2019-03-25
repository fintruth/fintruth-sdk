import { ErrorLink } from 'apollo-link-error'
import { InMemoryCache, defaultDataIdFromObject } from 'apollo-cache-inmemory'

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

export const createInMemoryCache = () =>
  new InMemoryCache({
    dataIdFromObject: obj => {
      switch (obj.__typename) {
        default:
          return defaultDataIdFromObject(obj)
      }
    },
  })
