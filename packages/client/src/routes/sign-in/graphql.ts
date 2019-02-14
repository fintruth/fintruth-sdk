import gql from 'graphql-tag'
import { User } from '@fintruth-sdk/shared'

interface UserResponse {
  error: any
  user?: User
}

export interface SignInViewMutationData {
  response: UserResponse
}

export interface SignInViewMutationVariables {
  email: string
  password: string
}

export interface TwoFactorAuthViewMutationData {
  response: UserResponse
}

export interface TwoFactorAuthViewMutationVariables {
  email: string
  password: string
  token: string
}

export const signInViewMutation = gql`
  mutation SignInViewMutation($email: String!, $password: String!) {
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

export const twoFactorAuthViewMutation = gql`
  mutation TwoFactorAuthViewMutation(
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
