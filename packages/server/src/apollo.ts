import { ApolloError, ApolloServer } from 'apollo-server-express'
import { tap } from 'ramda'
import { Container } from 'typedi'
import { useContainer as typeORMUseContainer } from 'typeorm'
import {
  buildSchema,
  useContainer as typeGraphQLUseContainer,
} from 'type-graphql'

import { User } from './entities'
import { ServerRequest, ServerResponse } from './server'
import { isProd } from 'config'
import { logger } from 'logger'
import * as resolvers from 'resolvers'

interface RequestParams {
  req: ServerRequest
  res: ServerResponse
}

export interface Context {
  res: ServerResponse
  user?: User
}

typeORMUseContainer(Container)
typeGraphQLUseContainer(Container)

const logError = (e: ApolloError) => logger.error('[apollo]', e)

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
