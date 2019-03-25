import { ApolloServer } from 'apollo-server-express'
import { Container } from 'typedi'
import { GraphQLError } from 'graphql'
import { buildSchema } from 'type-graphql'
import { tap } from 'ramda'
import { useContainer } from 'typeorm'

import * as resolvers from 'resolvers'
import { isProd } from 'config'
import { logger } from 'logger'
import { ServerRequest, ServerResponse } from './server'
import { User } from './entities'

export interface Context {
  res: ServerResponse
  user?: User
}

interface RequestParams {
  req: ServerRequest
  res: ServerResponse
}

useContainer(Container)

const logError = (e: GraphQLError) => logger.error('[apollo]', e)

export const createApolloServer = async (): Promise<ApolloServer> => {
  const schema = await buildSchema({
    container: Container,
    emitSchemaFile: !isProd && './schema.graphql',
    resolvers: Object.values(resolvers),
    validate: false, // see https://github.com/typestack/class-validator/issues/261
  })

  return new ApolloServer({
    context: ({ req, res }: RequestParams): Context => ({
      res,
      user: req.user,
    }),
    debug: !isProd,
    formatError: tap(logError),
    playground: !isProd,
    schema,
  })
}
