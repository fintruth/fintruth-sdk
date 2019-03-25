import { ApolloServer } from 'apollo-server-express'
import { Container } from 'typedi'
import { GraphQLError } from 'graphql'
import {
  buildSchema,
  useContainer as typeGraphQLUseContainer,
} from 'type-graphql'
import { tap } from 'ramda'
import { useContainer as typeORMUseContainer } from 'typeorm'

import { isProd } from 'config'
import { logger } from 'logger'
import * as resolvers from 'resolvers'
import { User } from './entities'
import { ServerRequest, ServerResponse } from './server'

export interface Context {
  res: ServerResponse
  user?: User
}

interface RequestParams {
  req: ServerRequest
  res: ServerResponse
}

typeORMUseContainer(Container)
typeGraphQLUseContainer(Container)

const logError = (e: GraphQLError) => logger.error('[apollo]', e)

export const createApolloServer = async (): Promise<ApolloServer> => {
  const schema = await buildSchema({
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
