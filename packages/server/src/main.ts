import Ses from 'aws-sdk/clients/ses'
import { start } from 'nact'
import { Container } from 'typedi'

import { spawnEmailer } from './actors'
import { createApolloServer } from './apollo'
import { createDatabaseConnection } from './database'
import { logAs } from './logger'
import { createServer } from './server'
import { ConfigService } from './services'

const log = logAs('Express')

const initializeActors = () => {
  const {
    client: { url },
    aws: {
      credentials,
      region,
      ses: { apiVersion: sesApiVersion, source },
    },
  } = Container.get(ConfigService)

  const ses = new Ses({ apiVersion: sesApiVersion, credentials, region })
  const system = start()

  Container.set('actorSystem', system)
  Container.set('emailer.actor', spawnEmailer(system, ses, source, url))
}

const bootstrap = async () => {
  await createDatabaseConnection()

  initializeActors()

  const { port } = Container.get(ConfigService).app

  const app = createServer()
  const server = await createApolloServer()

  server.applyMiddleware({ app, cors: false, path: '/api' })

  app.get('/', (_, res) => {
    res.sendStatus(200)
  })

  app.listen(port, () =>
    log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`)
  )
}

bootstrap()
