import { ApolloServer } from 'apollo-server-koa'
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
    resolvers: [UserResolver],
  })

  return new ApolloServer({ schema, context: {} })
}
