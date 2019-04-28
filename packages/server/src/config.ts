import dotenv from 'dotenv-safe'

dotenv.config({
  example: process.env.CI ? '.env.ci.example' : '.env.example',
})

export const env = process.env.NODE_ENV || 'development'
export const isProd = env === 'production'

export const port = parseInt(process.env.APP_PORT || '4000', 10)
export const secret = process.env.APP_SECRET || ''
export const trustProxy = process.env.TRUST_PROXY || 'loopback'
