import { ApolloError, ApolloServer } from 'apollo-server-koa'
import { Request } from 'koa'
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

typeORMUseContainer(Container)
typeGraphQLUseContainer(Container)

export const createApolloServer = async (): Promise<ApolloServer> => {
  const schema = await buildSchema({
    emitSchemaFile: './schema.graphql',
    resolvers: [AuthResolver, UserResolver],
    validate: true, // see https://github.com/typestack/class-validator/issues/261
  })

  return new ApolloServer({
    context: ({ ctx: { res, state } }: Request) => ({ res, state }),
    debug: isDev,
    formatError: (error: ApolloError) => {
      logger.debug('[graphql]', error)

      return error
    },
    playground: isDev,
    schema,
  })
}
