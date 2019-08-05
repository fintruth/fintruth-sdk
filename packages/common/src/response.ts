import gql from 'graphql-tag'

export interface Response {
  error?: ResponseError
}

export interface ResponseError {
  id: string
  message: string
}

export const responseErrorPropsFragment = gql`
  fragment ResponseErrorProps on ResponseError {
    id
    message
  }
`

export const responsePropsFragment = gql`
  fragment ResponseProps on Response {
    error {
      ...ResponseErrorProps
    }
  }
  ${responseErrorPropsFragment}
`
