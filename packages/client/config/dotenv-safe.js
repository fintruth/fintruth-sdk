const { join, resolve } = require('path')
const { config } = require('dotenv-safe')

const rootDir = resolve(__dirname, '..')

const env = process.env.ENV || 'development'
const isProd = /prod(uction)?/i.test(env)
const isStaging = /stag(e|ing)/i.test(env)
const envFile = isProd ? '.env.prod' : isStaging ? '.env.staging' : '.env'

config({ example: join(rootDir, '.env.example'), path: join(rootDir, envFile) })
