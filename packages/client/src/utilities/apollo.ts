import { ErrorLink } from 'apollo-link-error'
import { InMemoryCache, defaultDataIdFromObject } from 'apollo-cache-inmemory'
import { ApolloLink, NextLink, Operation } from 'apollo-link'

import { omitDeep } from 'utilities/object'

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
    freezeResults: true,
  })

export const createSanitizeLink = () =>
  new ApolloLink((operation: Operation, forward?: NextLink) => {
    const value = omitDeep(['__typename'], operation.variables)

    return forward
      ? forward(Object.defineProperty(operation, 'variables', { value }))
      : null
  })
