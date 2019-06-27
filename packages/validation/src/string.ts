import { CountryCode, parsePhoneNumberFromString } from 'libphonenumber-js'
import { string as BaseStringSchema } from 'yup'
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

export class StringSchema extends BaseStringSchema {
  password(minScore: Score, options?: PasswordOptions | string) {
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

  phone(options?: PhoneOptions | string) {
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
}

export const string = () => new StringSchema()
