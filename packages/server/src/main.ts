import { Container } from 'typedi'

import { createApolloServer } from 'apollo'
import { ConfigService } from 'services'
import { createDatabaseConnection } from 'database'
import { logAs } from 'logger'
import { createServer } from 'server'

const bootstrap = async (): Promise<void> => {
  await createDatabaseConnection()

  const app = createServer()
  const server = await createApolloServer()

  server.applyMiddleware({ app, cors: false, path: '/api' })

  app.get('/', (_, res) => {
    res.sendStatus(200)
  })

  const { port } = Container.get(ConfigService).app

  app.listen(port, () =>
    logAs('express')(
      `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
    )
  )
}

bootstrap()
