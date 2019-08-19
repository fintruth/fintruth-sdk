import { ConnectionOptions } from 'typeorm'

import * as entities from './entities'

if (!process.env.IS_BUNDLED) {
  require('dotenv-safe').config()
}

const baseConfig: Partial<ConnectionOptions> = {
  host: process.env.DB_HOST || '0.0.0.0',
  username: process.env.DB_USERNAME || '',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_DATABASE || '',
  port: Number(process.env.DB_PORT) || 5432,
  entities: Object.values(entities),
  logging: ['query', 'error'],
  migrationsRun: true,
  synchronize: false,
}

const defaultConfig: ConnectionOptions = {
  ...baseConfig,
  name: 'default',
  cli: {
    entitiesDir: 'src/entities',
    migrationsDir: 'src/migrations',
    subscribersDir: 'src/subscribers',
  },
  migrations: ['migrations/**/*.js'],
  migrationsTableName: 'typeorm_migrations',
  type: 'postgres',
}

const seedConfig: ConnectionOptions = {
  ...baseConfig,
  name: 'seed',
  cli: {
    entitiesDir: 'src/entities',
    migrationsDir: 'src/seeds',
    subscribersDir: 'src/subscribers',
  },
  migrations: ['seeds/**/*.js'],
  migrationsTableName: 'typeorm_seeds',
  type: 'postgres',
}

export = [defaultConfig, seedConfig]
