import Koa from 'koa'
import morgan from 'koa-morgan'

import { createApolloServer } from 'apollo'
import { createDatabaseConnection } from 'database'
import { logger } from 'logger'
import { router } from 'routes'

const bootstrap = async (): Promise<void> => {
  await createDatabaseConnection()

  const app = new Koa()
  app.use(morgan('common', { stream: logger.stream } as any)) // eslint-disable-line typescript/no-explicit-any

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
