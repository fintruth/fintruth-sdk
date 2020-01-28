declare namespace NodeJS {
  interface Global {
    navigator?: Navigator | { userAgent: string }
  }

  interface ProcessEnv {
    API_URI: string
    BROWSER_ENV?: string
    CLIENT_PORT: string
    NODE_ENV?: string
    TRANSLATIONS_DIR: string
  }
}
