import dotenv from 'dotenv-safe'
import { Service } from 'typedi'

dotenv.config()

@Service()
export default class ConfigService {
  app = {
    secret: process.env.APP_SECRET || '',
    port: Number(process.env.APP_PORT || '4000'),
    trustProxy: process.env.TRUST_PROXY || 'loopback',
  }
  aws = {
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY || '',
      secretAccessKey: process.env.AWS_ACCESS_SECRET || '',
    },
    region: process.env.AWS_REGION,
    ses: {
      apiVersion: '2010-12-01',
      sender: 'noreply@fintruth.com',
    },
  }
  env = process.env.NODE_ENV || 'development'
  isProd = this.env === 'production'
}
