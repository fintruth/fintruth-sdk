import { createApolloServer } from 'apollo'
import { port } from 'config'
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

  app.listen(port, () =>
    logAs('express')(
      `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
    )
  )
}

bootstrap()
