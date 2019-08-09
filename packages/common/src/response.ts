import gql from 'graphql-tag'

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
