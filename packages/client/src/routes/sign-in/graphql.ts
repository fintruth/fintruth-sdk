import gql from 'graphql-tag'
import { UserResponse } from '@fintruth-sdk/shared'

export interface SignInMutationData {
  response: UserResponse
}

export interface SignInMutationVariables {
  email: string
  password: string
}

export interface SignInTwoFactorAuthMutationData {
  response: UserResponse
}

export interface SignInTwoFactorAuthMutationVariables {
  email: string
  password: string
  token: string
}

export const signInMutation = gql`
  mutation SignInMutation($email: String!, $password: String!) {
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

export const signInTwoFactorAuthMutation = gql`
  mutation SignInTwoFactorAuthMutation(
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
