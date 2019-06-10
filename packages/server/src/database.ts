import { createConnections } from 'typeorm'

import config from './ormconfig'

export const createDatabaseConnection = async () => {
  const [connection, seedConnection] = await createConnections(config)

  await seedConnection.close()

  return connection
}
