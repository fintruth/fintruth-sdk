import { hashSync } from 'bcrypt'
import { Connection, createConnection } from 'typeorm'
import * as entities from './entities'
import { database } from './config'

export const createDatabaseConnection = () =>
  createConnection({
    ...database,
    type: 'postgres',
    entities: Object.values(entities),
    logging: ['query', 'error'],
    synchronize: true,
  }).then(async (connection: Connection) => {
    await connection.getRepository('User').save({
      id: '496ca0bf-470b-479a-b56d-f17c063003b1',
      email: 'demo@fintruth.com',
      password: hashSync('Asdfg!2345', 10),
      profile: { firstName: 'Demo', lastName: 'User' },
    })

    return connection
  })
