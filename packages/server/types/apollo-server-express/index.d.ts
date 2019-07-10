import 'apollo-server-express'

declare module 'apollo-server-express' {
  export interface FileStream extends NodeJS.ReadableStream {
    _readableState: {
      length: number
    }
  }

  export interface FileUpload {
    stream: FileStream
    filename: string
    mimetype: string
    encoding: string
  }
}
