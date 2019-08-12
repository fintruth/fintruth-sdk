declare module 'test-data-bot' {
  import Faker from 'faker'

  export type BuilderFunction<T> = (overrideFields?: Partial<T>) => T

  export type BuilderValue<T> = ((...args: any[]) => T) | T

  export interface Builder<T extends object> extends BuilderFunction<T> {
    fields(fieldsParams: { [K in keyof T]: BuilderValue<T[K]> }): Builder<T>
    map(fieldsParams: { [K in keyof T]: BuilderValue<T[K]> }): Builder<T>
  }

  export function arrayOf<T>(builder: BuilderValue<T>, count: number): T[]

  export function bool(): boolean

  export function build<T extends object>(name?: string): Builder<T>

  export function fake<T>(fakeFn: (f: Faker.FakerStatic) => T): T

  export function incrementingId(): number

  export function numberBetween(min: number, max: number): number

  export function oneOf<T>(...oneOfOptions: T[]): T

  export function perBuild<T>(buildFn: (...args: any[]) => T): T

  export function sequence<T>(sequenceFn: (id: number) => T): T
}
