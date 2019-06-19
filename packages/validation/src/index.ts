import zxcvbn from 'zxcvbn'
import { parseNumber } from 'libphonenumber-js'

import StringSchema from './string'

const string = () =>
  new StringSchema({
    passwordAnalyser: zxcvbn,
    phoneAnalyser: parseNumber as any,
  })

export * from 'yup'
export { StringSchema, string }
