import dotenv from 'dotenv-safe'
import { Service } from 'typedi'

interface AppConfig {
  port: number
  secret: string
  serverUrl: string
  trustProxy: string
}

interface AwsConfig {
  credentials: AwsCredentialsConfig
  debug: boolean
  httpOptions: AwsHttpOptionsConfig
  region: string
  s3: AwsS3Config
  ses: AwsSesConfig
}

interface AwsCredentialsConfig {
  accessKeyId: string
  secretAccessKey: string
}

interface AwsHttpOptionsConfig {
  timeout: number
}

interface AwsS3BucketsConfig {
  uploads: string
}

interface AwsS3Config {
  apiVersion: string
  buckets: AwsS3BucketsConfig
}

interface AwsSesConfig {
  apiVersion: string
  source: string
}

interface GraphqlConfig {
  rateLimit: GraphqlRateLimitConfig
}

interface GraphqlRateLimitConfig {
  max: number
  window: string
}

interface MediaConfig {
  allowedTypes: string[]
  maxFileSize: number
}

dotenv.config()

@Service()
export default class ConfigService {
  env = process.env.NODE_ENV || 'development'

  isProd = this.env === 'production'

  app: AppConfig = {
    port: Number(process.env.APP_PORT) || 4000,
    secret: process.env.APP_SECRET || '',
    serverUrl: process.env.APP_SERVER_URL || '',
    trustProxy: process.env.TRUST_PROXY || 'loopback',
  }

  aws: AwsConfig = {
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY || '',
      secretAccessKey: process.env.AWS_ACCESS_SECRET || '',
    },
    debug: !this.isProd,
    httpOptions: { timeout: 3000 },
    region: process.env.AWS_REGION || '',
    s3: {
      apiVersion: '2006-03-01',
      buckets: { uploads: process.env.AWS_S3_BUCKET_UPLOADS || '' },
    },
    ses: { apiVersion: '2010-12-01', source: 'noreply@fintruth.com' },
  }

  graphql: GraphqlConfig = {
    rateLimit: {
      max: Number(process.env.GRAPHQL_RATE_LIMIT_MAX) || 5,
      window: process.env.GRAPHQL_RATE_LIMIT_WINDOW || '10s',
    },
  }

  media: MediaConfig = {
    allowedTypes: ['application/pdf', 'image/jpeg', 'image/png'],
    maxFileSize: 2000000,
  }
}
