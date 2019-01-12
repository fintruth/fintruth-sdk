import { ApolloServer } from 'apollo-server-koa'
import { Request } from 'koa'
import { Container } from 'typedi'
import { useContainer as typeORMUseContainer } from 'typeorm'
import {
  buildSchema,
  useContainer as typeGraphQLUseContainer,
} from 'type-graphql'

import { UserResolver } from 'resolvers/user-resolver'

typeORMUseContainer(Container)
typeGraphQLUseContainer(Container)

export const createApolloServer = async (): Promise<ApolloServer> => {
  const schema = await buildSchema({
    emitSchemaFile: './schema.graphql',
    resolvers: [UserResolver],
  })

  return new ApolloServer({
    schema,
    context: ({ ctx: { res, state } }: Request) => ({ res, state }),
  })
}
