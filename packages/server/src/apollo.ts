import { Ability, defineAbilitiesFor } from '@fintruth-sdk/auth'
import { ApolloServer } from 'apollo-server-express'
import { GraphQLError } from 'graphql'
import { Container } from 'typedi'
import { buildSchema } from 'type-graphql'
import { tap } from 'ramda'
import { useContainer } from 'typeorm'

import * as resolvers from 'resolvers'
import { isProd } from 'config'
import { logAs } from 'logger'
import { ServerRequest, ServerResponse } from './server'
import { User } from './entities'

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
  const schema = await buildSchema({
    container: Container,
    emitSchemaFile: !isProd && './schema.graphql',
    resolvers: Object.values(resolvers),
    validate: false, // see https://github.com/typestack/class-validator/issues/261
  })

  return new ApolloServer({
    context: ({ req: { user }, res }: RequestParams): Context => {
      return {
        res,
        user,
        ability: defineAbilitiesFor(user),
      }
    },
    debug: !isProd,
    formatError: tap(logError),
    playground: !isProd,
    schema,
  })
}
