import dotenv from 'dotenv-safe'
import path from 'path'
import { ConnectionOptions } from 'typeorm'

import * as entities from './entities'

const env = process.env.NODE_ENV || 'development'
const isEnvProd = /prod(uction)?/i.test(env)
const isEnvStaging = /staging/i.test(env)

const envExt = isEnvProd ? 'prod' : isEnvStaging ? 'staging' : 'dev'

dotenv.config({ path: path.resolve(__dirname, `../.env.${envExt}`) })

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
  migrations: ['src/migrations/**/*.ts', 'migrations/**/*.js'],
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
  migrations: ['src/seeds/**/*.ts', 'seeds/**/*.js'],
  migrationsTableName: 'typeorm_seeds',
  type: 'postgres',
}

export = [defaultConfig, seedConfig]
