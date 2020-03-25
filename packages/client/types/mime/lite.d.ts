declare module 'mime/lite' {
  interface TypeMap {
    [key: string]: string[]
  }

  function define(mimes: TypeMap, force?: boolean): void

  function getExtension(mime: string): null | string

  function getType(path: string): null | string
}
