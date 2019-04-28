import { hashSync } from 'bcrypt'
import { Connection, createConnection } from 'typeorm'

import config from 'ormconfig'

export const createDatabaseConnection = () =>
  createConnection(config).then(async (connection: Connection) => {
    await connection.getRepository('User').save({
      id: '496ca0bf-470b-479a-b56d-f17c063003b1',
      email: 'demo@fintruth.com',
      isAdmin: false,
      password: hashSync('Asdfg!2345', 10),
    })

    await connection.getRepository('Profile').save({
      userId: '496ca0bf-470b-479a-b56d-f17c063003b1',
      firstName: 'Demo',
      lastName: 'User',
    })

    return connection
  })
