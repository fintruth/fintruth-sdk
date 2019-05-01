import SES from 'aws-sdk/clients/ses'
import { start } from 'nact'
import { Container } from 'typedi'

import { spawnEmailer } from 'actors'
import { createApolloServer } from 'apollo'
import { createDatabaseConnection } from 'database'
import { logAs } from 'logger'
import { createServer } from 'server'
import { ConfigService } from 'services'

const initializeActors = () => {
  const system = start()
  const {
    app: { serverUrl },
    aws: {
      credentials,
      region,
      ses: { apiVersion, sender },
    },
  } = Container.get(ConfigService)
  const ses = new SES({ apiVersion, credentials, region })

  Container.set('actorSystem', system)
  Container.set('actor.emailer', spawnEmailer(system, ses, sender, serverUrl))
}

const bootstrap = async (): Promise<void> => {
  await createDatabaseConnection()

  initializeActors()

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
