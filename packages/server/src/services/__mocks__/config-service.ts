import { Service } from 'typedi'

export default Service(() => ({
  app: {
    port: 4000,
    secret: 'KEYKEYKEYKEYKEYKEYKEYKEYKEYKEYKEY',
    trustProxy: 'loopback',
  },
  aws: { httpOptions: { timeout: 3000 }, s3: { bucket: 'test' } },
  env: 'development',
  isProd: false,
  media: {
    allowedTypes: ['application/pdf', 'image/jpeg', 'image/png'],
    maxFileSize: 10,
  },
}))
