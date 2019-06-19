import { StringSchema, string } from '@fintruth-sdk/validation'

import { Type } from 'components/input'

interface InputContext {
  isRequired: boolean
  type?: Type
}

interface SelectContext {
  isRequired: boolean
}

export const validateInput = (value: string, context: InputContext) =>
  string()
    .when(
      ['$isRequired', '$type'],
      (isRequired: boolean, type: Type | undefined, schema: StringSchema) => {
        if (isRequired) {
          schema = schema.required('This is a required field') // eslint-disable-line no-param-reassign
        }

        if (type === 'email') {
          // @ts-ignore missing-properties
          schema = schema.email('Enter a valid email address') // eslint-disable-line no-param-reassign
        } else if (type === 'password') {
          schema = schema.password(2) // eslint-disable-line no-param-reassign
        } else if (type === 'tel') {
          schema = schema.phone('Enter a valid phone number') // eslint-disable-line no-param-reassign
        }

        return schema
      }
    )
    .validate(value, { context })
    .then(() => '')
    .catch(error => error.message)

export const validateSelect = (value: string, context: SelectContext) =>
  string()
    .when('$isRequired', (isRequired: boolean, schema: StringSchema) =>
      isRequired ? schema.required('This is a required field') : schema
    )
    .validate(value, { context })
    .then(() => '')
    .catch(error => error.message)
