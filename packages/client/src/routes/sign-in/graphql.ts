import {
  User,
  UserResponse,
  userPropsFragment,
  userResponsePropsFragment,
} from '@fintruth-sdk/common'
import gql from 'graphql-tag'

export interface CurrentUserQueryData {
  user?: User
}

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

export const currentUserQuery = gql`
  query CurrentUserQuery {
    user: currentUser {
      ...UserProps
    }
  }
  ${userPropsFragment}
`

export const signInMutation = gql`
  mutation SignInMutation($email: String!, $password: String!) {
    response: signIn(email: $email, password: $password) {
      ...UserResponseProps
    }
  }
  ${userResponsePropsFragment}
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
      ...UserResponseProps
    }
  }
  ${userResponsePropsFragment}
`
