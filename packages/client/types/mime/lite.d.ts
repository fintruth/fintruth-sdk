declare module 'mime/lite' {
  export interface TypeMap {
    [key: string]: string[]
  }

  export function define(mimes: TypeMap, force?: boolean): void

  export function getExtension(mime: string): null | string

  export function getType(path: string): null | string
}
