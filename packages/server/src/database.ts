import { Connection, createConnection } from 'typeorm'

import { database } from 'config'
import { User } from 'entities/user'

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

    return connection.manager.save(user)
  })
