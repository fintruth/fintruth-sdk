import { ApolloError, ApolloServer } from 'apollo-server-express'
import { Request, Response } from 'express'
import { tap } from 'ramda'
import { Container } from 'typedi'
import { useContainer as typeORMUseContainer } from 'typeorm'
import {
  buildSchema,
  useContainer as typeGraphQLUseContainer,
} from 'type-graphql'

import { isDev } from 'config'
import { logger } from 'logger'
import { AuthResolver } from 'resolvers/auth-resolver'
import { UserResolver } from 'resolvers/user-resolver'

interface Context {
  req: Request
  res: Response
}

typeORMUseContainer(Container)
typeGraphQLUseContainer(Container)

const logError = (e: ApolloError) => logger.error('[graphql]', e)

export const createApolloServer = async (): Promise<ApolloServer> => {
  const schema = await buildSchema({
    emitSchemaFile: './schema.graphql',
    resolvers: [AuthResolver, UserResolver],
    validate: true, // see https://github.com/typestack/class-validator/issues/261
  })

  return new ApolloServer({
    context: ({ req, res }: Context) => ({ req, res }),
    debug: isDev,
    formatError: tap(logError),
    playground: isDev,
    schema,
  })
}
