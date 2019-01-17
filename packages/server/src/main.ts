import { createApolloServer } from 'apollo'

import { createDatabaseConnection } from 'database'
import { logger } from 'logger'
import { createExpressServer } from 'server'

const bootstrap = async (): Promise<void> => {
  await createDatabaseConnection()

  const app = createExpressServer()

  const server = await createApolloServer()
  server.applyMiddleware({ app, path: '/api' })

  app.listen(3000, () =>
    logger.info(`🚀 Server ready at http://localhost:3000${server.graphqlPath}`)
  )
}

bootstrap()
