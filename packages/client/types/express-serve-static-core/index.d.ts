import * as ExpressServeStaticCore from 'express-serve-static-core' // eslint-disable-line typescript/no-unused-vars, import/no-unresolved

declare module 'express-serve-static-core' {
  interface Application {
    hot?: __WebpackModuleApi.Hot
  }
}
