import { dispatch, start } from 'nact'
import { Container } from 'typedi'

import { Registration, spawnEmailer } from 'actors'
import { createApolloServer } from 'apollo'
import { createDatabaseConnection } from 'database'
import { logAs } from 'logger'
import { createServer } from 'server'
import { ConfigService } from 'services'

const bootstrap = async (): Promise<void> => {
  await createDatabaseConnection()

  const app = createServer()
  const server = await createApolloServer()

  server.applyMiddleware({ app, cors: false, path: '/api' })

  app.get('/', (_, res) => {
    res.sendStatus(200)
  })

  const { port } = Container.get(ConfigService).app

  const system = start()
  const emailer = spawnEmailer(system)

  dispatch(
    emailer,
    new Registration('erlich@aviato.com', 'Erlich Bachman', 'token')
  )

  app.listen(port, () =>
    logAs('express')(
      `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
    )
  )
}

bootstrap()
