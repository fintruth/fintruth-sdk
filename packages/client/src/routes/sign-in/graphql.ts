import gql from 'graphql-tag'
import { UserResponse } from '@fintruth-sdk/shared'

export interface SignInFormMutationData {
  response: UserResponse
}

export interface SignInFormMutationVariables {
  email: string
  password: string
}

export interface TwoFactorAuthFormMutationData {
  response: UserResponse
}

export interface TwoFactorAuthFormMutationVariables {
  email: string
  password: string
  token: string
}

export const signInFormMutation = gql`
  mutation SignInFormMutation($email: String!, $password: String!) {
    response: signIn(email: $email, password: $password) {
      error {
        message
      }
      user {
        id
        email
        isTwoFactorAuthEnabled
      }
    }
  }
`

export const twoFactorAuthFormMutation = gql`
  mutation TwoFactorAuthFormMutation(
    $email: String!
    $password: String!
    $token: String!
  ) {
    response: signInTwoFactorAuth(
      email: $email
      password: $password
      token: $token
    ) {
      error {
        message
      }
      user {
        id
        email
        isTwoFactorAuthEnabled
      }
    }
  }
`
