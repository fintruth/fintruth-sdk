import gql from 'graphql-tag'

import { Primitive, SubType } from 'utils'

export type ShallowResponse = SubType<Response, Primitive>

export type ShallowResponseError = SubType<ResponseError, Primitive>

export interface Response {
  error?: ResponseError
}

export interface ResponseError {
  id: string
  message: string
}

export const shallowResponseErrorPropsFragment = gql`
  fragment ShallowResponseErrorProps on ResponseError {
    id
    message
  }
`
