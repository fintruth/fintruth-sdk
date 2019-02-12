import { ApolloError, ApolloServer } from 'apollo-server-express'
import { path, tap } from 'ramda'
import { Container } from 'typedi'
import { useContainer as typeORMUseContainer } from 'typeorm'
import {
  buildSchema,
  useContainer as typeGraphQLUseContainer,
} from 'type-graphql'

import { isProd } from 'config'
import { logger } from 'logger'
import * as resolvers from 'resolvers'
import { UserService } from 'services'
import { User } from './entities'
import { ServerRequest, ServerResponse } from './server'

interface RequestParams {
  req: ServerRequest
  res: ServerResponse
}

export interface Context {
  res: ServerResponse
  signInUser?: User
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

  const getUserContext = async (userId: string, isTwoFactor?: boolean) => {
    const user = await Container.get(UserService).findById(userId)
    const isAuthenticated = user && (!user.isTwoFactorEnabled || isTwoFactor)

    return isAuthenticated ? { user } : { signInUser: user }
  }

  return new ApolloServer({
    context: async ({ req, res }: RequestParams) => {
      const userId = path<string>(['user', 'id'], req)
      const isTwoFactor = path<boolean>(['user', 'isTwoFactor'], req)
      const userContext = userId
        ? await getUserContext(userId, isTwoFactor)
        : {}

      return {
        ...userContext,
        res,
      }
    },
    debug: !isProd,
    formatError: tap(logError),
    playground: !isProd,
    schema,
  })
}
