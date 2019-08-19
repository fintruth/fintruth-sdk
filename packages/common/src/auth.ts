import gql from 'graphql-tag'

import { Response } from './response'

export interface EnableTwoFactorAuthResponse extends Response {
  dataUrl?: string
  secret?: string
}

export interface SignInResponse extends Response {
  isTwoFactorAuthEnabled?: boolean
}

export const shallowEnableTwoFactorAuthResponsePropsFragment = gql`
  fragment ShallowEnableTwoFactorAuthResponseProps on EnableTwoFactorAuthResponse {
    dataUrl
    secret
  }
`

export const shallowSignInResponsePropsFragment = gql`
  fragment ShallowSignInResponseProps on SignInResponse {
    isTwoFactorAuthEnabled
  }
`
