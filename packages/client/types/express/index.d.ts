import * as Express from 'express' // eslint-disable-line typescript/no-unused-vars

declare module 'express' {
  interface Express {
    hot?: __WebpackModuleApi.Hot
  }
}
