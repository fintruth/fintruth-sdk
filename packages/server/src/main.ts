import Koa from 'koa'

import { createApolloServer } from 'apollo'
import { createDatabaseConnection } from 'database'
import { router } from 'routes'

const bootstrap = async (): Promise<void> => {
  await createDatabaseConnection()

  const app = new Koa()
  const server = await createApolloServer()

  server.applyMiddleware({ app })

  app
    .use(router.routes())
    .use(router.allowedMethods())
    .listen(3000, () =>
      console.log(
        `🚀 Server ready at http://localhost:3000${server.graphqlPath}`
      )
    )
}

bootstrap()
