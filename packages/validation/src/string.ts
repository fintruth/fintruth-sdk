import { isEmpty, isNil } from 'ramda'
import { isPlainObject } from 'ramda-adjunct'
import { string as YupStringSchema } from 'yup'

type Score = 0 | 1 | 2 | 3 | 4

interface PasswordAnalysis {
  score: Score
}

interface PhoneAnalysis {
  country: string
  countryCallingCode?: string
  ext?: string
  phone: string
  possible?: boolean
  valid?: boolean
}

interface PhoneOptions {
  defaultCountry?: string
  excludeEmptyString?: boolean
  extended?: boolean
  message?: string
}

interface Props {
  passwordAnalyser(password: string, dictionary?: string[]): PasswordAnalysis
  phoneAnalyser(phone: string, options?: PhoneOptions): PhoneAnalysis
}

export default class StringSchema extends YupStringSchema {
  props: Props

  constructor(props: Props) {
    super()

    this.props = props
  }

  password(minScore: Score, message: string = 'Enter a stronger password') {
    return this.test({
      exclusive: true,
      message,
      name: 'password',
      params: { minScore },
      test: value =>
        isNil(value) || minScore < this.props.passwordAnalyser(value).score,
    })
  }

  phone(options?: PhoneOptions | string) {
    let mergedOptions = {
      defaultCountry: 'US',
      excludeEmptyString: false,
      extended: true,
      message: 'Enter a valid phone number',
    }

    if (typeof options === 'object' && isPlainObject(options)) {
      mergedOptions = { ...mergedOptions, ...options }
    } else if (typeof options === 'string') {
      mergedOptions.message = options
    }

    return this.test({
      exclusive: true,
      message: mergedOptions.message,
      name: 'phone',
      test: value => {
        if (isNil(value)) {
          return true
        }

        if (value === '' && mergedOptions.excludeEmptyString) {
          return true
        }

        const result = this.props.phoneAnalyser(value, {
          defaultCountry: mergedOptions.defaultCountry,
          extended: mergedOptions.extended,
        })

        return mergedOptions.extended ? !!result.valid : !isEmpty(result)
      },
    })
  }
}
