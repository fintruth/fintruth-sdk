import { Ability, defineAbilitiesFor } from '@fintruth-sdk/auth'
import { ApolloServer } from 'apollo-server-express'
import { GraphQLError } from 'graphql'
import { tap } from 'ramda'
import { Container } from 'typedi'
import { buildSchema } from 'type-graphql'
import { useContainer } from 'typeorm'

import { User } from './entities'
import { logAs } from './logger'
import * as resolvers from './resolvers'
import { ConfigService } from './services'
import { ServerRequest, ServerResponse } from './server'

export interface Context {
  res: ServerResponse
  user?: User
  ability: Ability
}

interface RequestParams {
  req: ServerRequest
  res: ServerResponse
}

useContainer(Container)

const log = logAs('apollo')
const logError = (error: GraphQLError) => log(error, 'error')

export const createApolloServer = async (): Promise<ApolloServer> => {
  const {
    isProd,
    media: { maxFileSize },
  } = Container.get(ConfigService)
  const schema = await buildSchema({
    container: Container,
    emitSchemaFile: !isProd && './schema.graphql',
    resolvers: Object.values(resolvers),
    validate: false, // see https://github.com/typestack/class-validator/issues/261
  })

  return new ApolloServer({
    context: ({ req: { user }, res }: RequestParams): Context => ({
      ability: defineAbilitiesFor(user),
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
