import { StringSchema, string } from '@fintruth-sdk/validation'

import { Type } from 'components/input'

export interface InputContext {
  isRequired: boolean
  type?: Type
}

export interface SelectContext {
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
          schema = schema.email('Enter a valid email address') // eslint-disable-line no-param-reassign
        } else if (type === 'password') {
          schema = schema.password(2, 'Enter a stronger password') // eslint-disable-line no-param-reassign
        }

        return schema
      }
    )
    .validate(value, { context })
    .then(() => '')
    .catch((error) => error.message)

export const validateSelect = (value: string, context: SelectContext) =>
  string()
    .when('$isRequired', (isRequired: boolean, schema: StringSchema) =>
      isRequired ? schema.required('This is a required field') : schema
    )
    .validate(value, { context })
    .then(() => '')
    .catch((error) => error.message)
