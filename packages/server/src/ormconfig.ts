import dotenv from 'dotenv-safe'
import { ConnectionOptions } from 'typeorm'

import * as entities from './entities'

dotenv.config()

const config: ConnectionOptions = {
  host: process.env.DB_HOST || '0.0.0.0',
  username: process.env.DB_USERNAME || '',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_DATABASE || '',
  port: Number(process.env.DB_PORT) || 5432,
  cli: {
    entitiesDir: 'src/entities',
    migrationsDir: 'src/migrations',
    subscribersDir: 'src/subscribers',
  },
  entities: Object.values(entities),
  logging: ['query', 'error'],
  migrations: ['src/migrations/**/*.ts', 'migrations/**/*.js'],
  migrationsRun: true,
  migrationsTableName: 'typeorm_migrations',
  synchronize: false,
  type: 'postgres',
}

export = config
