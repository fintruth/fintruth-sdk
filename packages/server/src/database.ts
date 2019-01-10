import path from 'path'
import { Connection, createConnection } from 'typeorm'
import { User } from 'entities/user'

export const initializeDatabase = (): Promise<User> =>
  createConnection({
    type: 'postgres',
    host: '0.0.0.0',
    username: 'postgres',
    password: 'postgres',
    database: 'database',
    port: 5432,
    entities: [path.resolve(__dirname, 'entities/*.ts')],
    logging: ['query', 'error'],
    synchronize: true,
  }).then((connection: Connection) => {
    const user = new User()
    user.id = '496ca0bf-470b-479a-b56d-f17c063003b1'
    user.email = 'demo@fintruth.com'

    return connection.manager.save(user)
  })
