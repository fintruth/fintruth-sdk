import gql from 'graphql-tag'

import { Response, responseErrorPropsFragment } from './response'

export interface EnableTwoFactorAuthResponse extends Response {
  dataUrl?: string
  secret?: string
}

export const enableTwoFactorAuthResponsePropsFragment = gql`
  fragment EnableTwoFactorAuthResponseProps on EnableTwoFactorAuthResponse {
    dataUrl
    error {
      ...ResponseErrorProps
    }
    secret
  }
  ${responseErrorPropsFragment}
`
