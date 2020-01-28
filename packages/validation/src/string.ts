import { CountryCode, parsePhoneNumberFromString } from 'libphonenumber-js'
import {
  Ref,
  Schema,
  TestOptionsMessage,
  addMethod,
  string as baseString,
} from 'yup'
import zxcvbn from 'zxcvbn'

export type Score = 0 | 1 | 2 | 3 | 4

export interface PasswordOptions {
  dictionary?: string[]
  excludeEmptyString?: boolean
  message?: string
}

export interface PhoneOptions {
  defaultCountry?: CountryCode
  excludeEmptyString?: boolean
  message?: string
}

export interface StringLocale {
  length?: TestOptionsMessage<{ length: number }>
  min?: TestOptionsMessage<{ min: number }>
  max?: TestOptionsMessage<{ max: number }>
  matches?: TestOptionsMessage<{ regex: RegExp }>
  email?: TestOptionsMessage<{ regex: RegExp }>
  url?: TestOptionsMessage<{ regex: RegExp }>
  trim?: TestOptionsMessage
  lowercase?: TestOptionsMessage
  uppercase?: TestOptionsMessage
}

export interface StringSchema<T extends string | null | undefined = string>
  extends Schema<T> {
  email(message?: StringLocale['email']): StringSchema<T>
  ensure(): StringSchema<T>
  length(limit: number | Ref, message?: StringLocale['length']): StringSchema<T>
  lowercase(message?: StringLocale['lowercase']): StringSchema<T>
  matches(
    regex: RegExp,
    messageOrOptions?:
      | StringLocale['matches']
      | { message?: StringLocale['matches']; excludeEmptyString?: boolean }
  ): StringSchema<T>
  max(limit: number | Ref, message?: StringLocale['max']): StringSchema<T>
  min(limit: number | Ref, message?: StringLocale['min']): StringSchema<T>
  notRequired(): StringSchema<T | undefined>
  nullable(isNullable: false): StringSchema<Exclude<T, null>>
  nullable(isNullable?: boolean): StringSchema<T>
  nullable(isNullable?: true): StringSchema<T | null>
  password(minScore: Score, options?: PasswordOptions | string): StringSchema<T>
  phone(this: StringSchema, options?: PhoneOptions | string): StringSchema<T>
  required(
    message?: TestOptionsMessage
  ): StringSchema<Exclude<T, null | undefined>>
  trim(message?: StringLocale['trim']): StringSchema<T>
  uppercase(message?: StringLocale['uppercase']): StringSchema<T>
  url(message?: StringLocale['url']): StringSchema<T>
}

export interface StringSchemaConstructor {
  (): StringSchema
  new (): StringSchema
}

function password(
  this: StringSchema,
  minScore: Score,
  options?: PasswordOptions | string
) {
  const {
    dictionary = undefined,
    excludeEmptyString = true,
    message = 'Enter a stronger password',
  } = typeof options === 'string' ? { message: options } : options || {}

  return this.test({
    exclusive: true,
    message,
    name: 'password',
    params: { minScore },
    test: (value?: null | string) =>
      value == null ||
      (value === '' && excludeEmptyString) ||
      minScore < zxcvbn(value, dictionary).score,
  })
}

function phone(this: StringSchema, options?: PhoneOptions | string) {
  const {
    defaultCountry = 'US',
    excludeEmptyString = true,
    message = 'Enter a valid phone number',
  } = typeof options === 'string' ? { message: options } : options || {}

  return this.test({
    exclusive: true,
    message,
    name: 'phone',
    test: (value?: null | string) =>
      value == null ||
      (value === '' && excludeEmptyString) ||
      !!parsePhoneNumberFromString(value, defaultCountry),
  })
}

addMethod(baseString, 'password', password)
addMethod(baseString, 'phone', phone)

export const string: StringSchemaConstructor = baseString as StringSchemaConstructor
