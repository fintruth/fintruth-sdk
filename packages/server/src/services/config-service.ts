import dotenv from 'dotenv-safe'
import path from 'path'
import { Service } from 'typedi'

const env = process.env.NODE_ENV || 'development'
const isEnvProd = /prod(uction)?/i.test(env)
const isEnvStaging = /staging/i.test(env)

const envExt = isEnvProd ? 'prod' : isEnvStaging ? 'staging' : 'dev'

dotenv.config({ path: path.resolve(__dirname, `../../.env.${envExt}`) })

@Service()
export default class ConfigService {
  env = process.env.NODE_ENV || 'development'
  isProd = this.env === 'production'
  app = {
    port: Number(process.env.APP_PORT || '4000'),
    secret: process.env.APP_SECRET || '',
    serverUrl: process.env.APP_SERVER_URL || '',
    trustProxy: process.env.TRUST_PROXY || 'loopback',
  }
  aws = {
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY || '',
      secretAccessKey: process.env.AWS_ACCESS_SECRET || '',
    },
    debug: !this.isProd,
    httpOptions: {
      timeout: 3000,
    },
    region: process.env.AWS_REGION || '',
    s3: {
      apiVersion: '2006-03-01',
      bucket: process.env.AWS_S3_BUCKET || '',
      prefix: process.env.AWS_S3_PREFIX || '',
    },
    ses: {
      apiVersion: '2010-12-01',
      sender: 'noreply@fintruth.com',
    },
  }
  media = {
    allowedTypes: ['application/pdf', 'image/jpeg', 'image/png'],
    maxFileSize: 2000000,
  }
}
