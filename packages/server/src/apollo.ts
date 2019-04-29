import { Ability, defineAbilitiesFor } from '@fintruth-sdk/auth'
import { ApolloServer } from 'apollo-server-express'
import { GraphQLError } from 'graphql'
import { tap } from 'ramda'
import { Container } from 'typedi'
import { buildSchema } from 'type-graphql'
import { useContainer } from 'typeorm'

import { logAs } from 'logger'
import * as resolvers from 'resolvers'
import { ConfigService } from 'services'
import { ServerRequest, ServerResponse } from 'server'
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
  const { isProd } = Container.get(ConfigService)
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
