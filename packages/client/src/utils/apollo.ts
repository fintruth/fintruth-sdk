import {
  InMemoryCache,
  InMemoryCacheConfig as InMemoryCacheOptions,
  IntrospectionFragmentMatcher,
  IntrospectionResultData,
  NormalizedCacheObject,
  defaultDataIdFromObject,
} from 'apollo-cache-inmemory'
import ApolloClient, { ApolloClientOptions } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { ErrorLink } from 'apollo-link-error'
import { path } from 'ramda'

import introspectionQueryResultData from '../fragment-types.json'

interface IntrospectionFragmentMatcherOptions {
  introspectionQueryResultData?: IntrospectionResultData
}

interface Options extends Partial<ApolloClientOptions<NormalizedCacheObject>> {
  defaults?: Record<string, any>
  links?: ApolloLink[]
  preloadedCache?: NormalizedCacheObject
}

export const createErrorLink = () =>
  new ErrorLink(({ graphQLErrors = [], networkError }) => {
    graphQLErrors.forEach(({ locations = [], message, path = [] }) =>
      console.warn(
        `[GraphQL Error]: ${message}${
          locations.length > 0
            ? ` Location: ${locations
                .map(({ column, line }) => `${line}:${column}`)
                .join(' > ')}`
            : ''
        }${path.length > 0 ? ` Path: ${path.join(' > ')}` : ''}`
      )
    )

    if (networkError) {
      console.warn(`[Network Error]: ${networkError.message}`)
    }
  })

const createFragmentMatcher = (
  options: IntrospectionFragmentMatcherOptions = {}
) =>
  new IntrospectionFragmentMatcher({ introspectionQueryResultData, ...options })

export const createInMemoryCache = (options: InMemoryCacheOptions = {}) =>
  new InMemoryCache({
    dataIdFromObject: (value) => {
      switch (value.__typename) {
        default:
          return defaultDataIdFromObject(value)
      }
    },
    freezeResults: true,
    fragmentMatcher: createFragmentMatcher(),
    ...options,
  })

export const createApolloClient = ({
  cache: providedCache,
  defaults,
  links = [],
  preloadedCache,
  ...restOptions
}: Options = {}) => {
  let cache = providedCache || createInMemoryCache()

  if (preloadedCache) {
    cache = cache.restore(preloadedCache)
  }

  if (defaults) {
    cache.writeData({ data: defaults })
  }

  const client = new ApolloClient({
    assumeImmutableResults: true,
    cache,
    link: ApolloLink.from(links),
    ...restOptions,
  })

  if (defaults) {
    client.onResetStore(() =>
      Promise.resolve(cache.writeData({ data: defaults }))
    )
  }

  return client
}

export const hasResponseError = <TData = {}>(data: TData | {} = {}) =>
  !!path(['response', 'error'], data)
