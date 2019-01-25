import dotenv from 'dotenv-safe'

dotenv.config()

export const env = process.env.NODE_ENV || 'development'
export const isProd = env === 'production'
export const isDev = !isProd

export const port = parseInt(process.env.APP_PORT || '3000', 10)
export const secret = process.env.APP_SECRET || ''
export const trustProxy = process.env.TRUST_PROXY || 'loopback'

export const database = {
  host: process.env.DB_HOST || '0.0.0.0',
  username: process.env.DB_USERNAME || '',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_DATABASE || '',
  port: 5432,
}
