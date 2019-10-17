import { ApolloServer } from 'apollo-server-express'
import { GraphQLError } from 'graphql'
import { getGraphQLRateLimiter } from 'graphql-rate-limit'
import { tap } from 'ramda'
import { Container } from 'typedi'
import { buildSchema } from 'type-graphql'
import { useContainer } from 'typeorm'

import { Ability, defineAbilitiesFor } from './auth' // eslint-disable-line import/named
import { User } from './entities'
import { logAs } from './logger'
import { Daos } from './models'
import * as resolvers from './resolvers'
import { createRateLimiterMiddleware } from './resolvers/middlewares'
import { ConfigService } from './services'
import { ServerRequest, ServerResponse } from './server'

export interface Context {
  ability: Ability
  ip: string
  res: ServerResponse
  user?: User
}

export interface AuthContext extends Context {
  user: User
}

interface RequestParams {
  req: ServerRequest
  res: ServerResponse
}

const log = logAs('Apollo')
const logError = (error: GraphQLError) => log(error, 'error')

useContainer(Container) // eslint-disable-line react-hooks/rules-of-hooks

export const createApolloServer = async (): Promise<ApolloServer> => {
  const {
    graphql: {
      rateLimit: { max, window },
    },
    isProd,
    media: { maxFileSize },
  } = Container.get(ConfigService)

  const rateLimiter = getGraphQLRateLimiter({
    identifyContext: ({ ip }: Context) => ip,
  })

  const schema = await buildSchema({
    authChecker: ({ context: { user } }) => !!user,
    container: Container,
    emitSchemaFile: !isProd && './schema.graphql',
    globalMiddlewares: [
      createRateLimiterMiddleware(rateLimiter, { max, window }),
    ],
    resolvers: Object.values(resolvers),
    validate: false, // https://github.com/typestack/class-validator/issues/261
  })

  return new ApolloServer({
    context: async ({ req: { ip, token }, res }: RequestParams) => {
      const user = token
        ? await Container.get(Daos).users.findById(token.id)
        : undefined

      return {
        ability: defineAbilitiesFor(user),
        ip,
        res,
        user,
      }
    },
    debug: !isProd,
    formatError: tap(logError),
    playground: !isProd,
    schema,
    uploads: { maxFileSize: maxFileSize * 50, maxFiles: 50 },
  })
}
