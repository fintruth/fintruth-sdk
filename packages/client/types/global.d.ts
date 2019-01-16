declare const __DEV__: boolean // eslint-disable-line typescript/no-unused-vars

// eslint-disable-next-line typescript/no-unused-vars
declare namespace NodeJS {
  interface Global {
    navigator?: Navigator | { userAgent: string }
  }
}

interface Window {
  __APOLLO_STATE__: {}
}
