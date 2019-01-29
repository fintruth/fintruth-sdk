import * as Express from 'express'

declare module 'express' {
  interface Express {
    hot?: __WebpackModuleApi.Hot
  }
}
