import dotenv from 'dotenv-safe'
import { Service } from 'typedi'

dotenv.config({
  example: process.env.CI ? '.env.ci.example' : '.env.example',
})

@Service()
export default class ConfigService {
  app = {
    secret: process.env.APP_SECRET || '',
    port: Number(process.env.APP_PORT || '4000'),
    trustProxy: process.env.TRUST_PROXY || 'loopback',
  }
  env = process.env.NODE_ENV || 'development'
  isProd = this.env === 'production'
}
