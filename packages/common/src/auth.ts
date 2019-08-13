import gql from 'graphql-tag'

import { Primitive, SubType } from 'utils'
import { Response } from './response'

export type ShallowEnableTwoFactorAuthResponse = SubType<
  EnableTwoFactorAuthResponse,
  Primitive
>

export type ShallowSignInResponse = SubType<SignInResponse, Primitive>

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
