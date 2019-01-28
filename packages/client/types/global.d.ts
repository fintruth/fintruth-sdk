declare const __DEV__: boolean

declare namespace NodeJS {
  interface Global {
    navigator?: Navigator | { userAgent: string }
  }
}

interface Window {
  __APOLLO_STATE__: {}
}
