import gql from 'graphql-tag'

import { Response } from './response'

export interface ShallowEnableTwoFactorAuthResponse {
  dataUrl?: string
  secret?: string
}

export interface EnableTwoFactorAuthResponse
  extends ShallowEnableTwoFactorAuthResponse,
    Response {}

export interface ShallowSignInResponse {
  isTwoFactorAuthEnabled?: boolean
}

export interface SignInResponse extends ShallowSignInResponse, Response {}

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
