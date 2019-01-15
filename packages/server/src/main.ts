import Koa from 'koa'
import jwt from 'koa-jwt'
import morgan from 'koa-morgan'

import { createApolloServer } from 'apollo'
import { secret } from 'config'
import { createDatabaseConnection } from 'database'
import { logger } from 'logger'
import { router } from 'routes'

const bootstrap = async (): Promise<void> => {
  await createDatabaseConnection()

  const app = new Koa()
  app
    .use(morgan('common', { stream: logger.stream } as any))
    .use(jwt({ secret, passthrough: true }))

  const server = await createApolloServer()
  server.applyMiddleware({ app })

  app
    .use(router.routes())
    .use(router.allowedMethods())
    .listen(3000, () =>
      logger.info(
        `🚀 Server ready at http://localhost:3000${server.graphqlPath}`
      )
    )
}

bootstrap()
