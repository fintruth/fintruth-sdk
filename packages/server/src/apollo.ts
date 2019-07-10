import { Ability, defineAbilitiesFor } from '@fintruth-sdk/auth'
import { User } from '@fintruth-sdk/common'
import { ApolloServer } from 'apollo-server-express'
import { GraphQLError } from 'graphql'
import { tap } from 'ramda'
import { Container } from 'typedi'
import { buildSchema } from 'type-graphql'
import { useContainer } from 'typeorm'

import { logAs } from './logger'
import * as resolvers from './resolvers'
import { RateLimit } from './resolvers/middlewares'
import { ConfigService } from './services'
import { ServerRequest, ServerResponse } from './server'

export interface Context {
  ability: Ability
  ip: string
  res: ServerResponse
  user?: User
}

interface RequestParams {
  req: ServerRequest
  res: ServerResponse
}

const log = logAs('Apollo')
const logError = (error: GraphQLError) => log(error, 'error')

useContainer(Container)

export const createApolloServer = async (): Promise<ApolloServer> => {
  const {
    graphql: {
      rateLimit: { max, window },
    },
    isProd,
    media: { maxFileSize },
  } = Container.get(ConfigService)

  const schema = await buildSchema({
    container: Container,
    emitSchemaFile: !isProd && './schema.graphql',
    globalMiddlewares: [RateLimit(max, window)],
    resolvers: Object.values(resolvers),
    validate: false, // See https://github.com/typestack/class-validator/issues/261
  })

  return new ApolloServer({
    context: ({ req: { ip, user }, res }: RequestParams): Context => ({
      ability: defineAbilitiesFor(user),
      ip,
      res,
      user,
    }),
    debug: !isProd,
    formatError: tap(logError),
    playground: !isProd,
    schema,
    uploads: { maxFileSize: maxFileSize * 50, maxFiles: 50 },
  })
}
