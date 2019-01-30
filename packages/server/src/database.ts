import { Connection, createConnection } from 'typeorm'

import { User } from './entities'
import { database } from 'config'

export const createDatabaseConnection = (): Promise<User> =>
  createConnection({
    ...database,
    type: 'postgres',
    entities: [User],
    logging: ['query', 'error'],
    synchronize: true,
  }).then((connection: Connection) => {
    const user = new User()
    user.id = '496ca0bf-470b-479a-b56d-f17c063003b1'
    user.email = 'demo@fintruth.com'
    user.password = 'nopassword'

    return connection.manager.save(user)
  })
