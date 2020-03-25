import 'apollo-server-express'

declare module 'apollo-server-express' {
  interface FileStream extends NodeJS.ReadableStream {
    _readableState: {
      length: number
    }
  }

  interface FileUpload {
    stream: FileStream
    filename: string
    mimetype: string
    encoding: string
  }
}
