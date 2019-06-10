import SES from 'aws-sdk/clients/ses'
import { start } from 'nact'
import { Container } from 'typedi'

import { spawnEmailer } from './actors'
import { createApolloServer } from './apollo'
import { createDatabaseConnection } from './database'
import { logAs } from './logger'
import { createServer } from './server'
import { ConfigService } from './services'

const log = logAs('express')

const initializeActors = () => {
  const system = start()
  const {
    app: { serverUrl },
    aws: {
      credentials,
      region,
      ses: { apiVersion: sesApiVersion, sender },
    },
  } = Container.get(ConfigService)
  const ses = new SES({ apiVersion: sesApiVersion, credentials, region })

  Container.set('actorSystem', system)
  Container.set('emailer.actor', spawnEmailer(system, ses, sender, serverUrl))
}

const bootstrap = async () => {
  await createDatabaseConnection()

  initializeActors()

  const app = createServer()
  const server = await createApolloServer()
  const {
    app: { port },
  } = Container.get(ConfigService)

  server.applyMiddleware({ app, cors: false, path: '/api' })

  app.get('/', (_, res) => {
    res.sendStatus(200)
  })

  app.listen(port, () =>
    log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`)
  )
}

bootstrap()
