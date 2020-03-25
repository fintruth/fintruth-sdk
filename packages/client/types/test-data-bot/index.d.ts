declare module 'test-data-bot' {
  import Faker from 'faker'

  type BuilderFunction<T> = (overrideFields?: Partial<T>) => T

  type BuilderValue<T> = ((...args: any[]) => T) | T

  interface Builder<T extends object> extends BuilderFunction<T> {
    fields(fieldsParams: { [K in keyof T]: BuilderValue<T[K]> }): Builder<T>
    map(fieldsParams: { [K in keyof T]: BuilderValue<T[K]> }): Builder<T>
  }

  function arrayOf<T>(builder: BuilderValue<T>, count: number): T[]

  function bool(): boolean

  function build<T extends object>(name?: string): Builder<T>

  function fake<T>(fakeFn: (f: Faker.FakerStatic) => T): T

  function incrementingId(): number

  function numberBetween(min: number, max: number): number

  function oneOf<T>(...oneOfOptions: T[]): T

  function perBuild<T>(buildFn: (...args: any[]) => T): T

  function sequence<T>(sequenceFn: (id: number) => T): T
}
