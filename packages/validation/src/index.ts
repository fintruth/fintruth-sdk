import zxcvbn from 'zxcvbn'
import { parseNumber } from 'libphonenumber-js'

import StringSchema from './string'

const string = () =>
  new StringSchema({
    passwordAnalyser: zxcvbn,
    phoneAnalyser: parseNumber as any,
  })

export {
  ValidationError,
  array,
  boolean,
  date,
  lazy,
  mixed,
  number,
  object,
  ref,
} from 'yup'
export { string }
