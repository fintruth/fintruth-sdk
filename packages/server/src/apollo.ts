import { ApolloServer, gql } from 'apollo-server-koa'

const typeDefs = gql`
  type Query {
    hello: String
  }
`

const resolvers = {
  Query: {
    hello: () => 'It works!',
  },
}

export const createApolloServer = (): ApolloServer =>
  new ApolloServer({ resolvers, typeDefs })
