import { Service } from 'typedi'

export default Service(() => ({
  app: {
    secret: 'KEYKEYKEYKEYKEYKEYKEYKEYKEYKEYKEY',
    port: 4000,
    trustProxy: 'loopback',
  },
  env: 'development',
  isProd: false,
}))
