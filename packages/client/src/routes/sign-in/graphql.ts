import {
  Profile,
  ResponseError,
  ShallowSignInResponse,
  ShallowUser,
  shallowProfilePropsFragment,
  shallowResponseErrorPropsFragment,
  shallowSignInResponsePropsFragment,
  shallowUserPropsFragment,
} from '@fintruth-sdk/common'
import gql from 'graphql-tag'

interface QueriedResponse {
  error: ResponseError
}

interface QueriedSignInResponse extends ShallowSignInResponse {
  error: ResponseError
}

interface QueriedUser extends ShallowUser {
  profile: Profile
}

export interface CurrentUserQueryData {
  user?: QueriedUser
}

export interface SignInMutationData {
  response: QueriedSignInResponse
}

export interface SignInMutationVariables {
  email: string
  password: string
}

export interface SignInTwoFactorAuthMutationData {
  response: QueriedResponse
}

export interface SignInTwoFactorAuthMutationVariables {
  email: string
  password: string
  token: string
}

export const currentUserQuery = gql`
  query CurrentUserQuery {
    user: currentUser {
      ...ShallowUserProps
      profile {
        ...ShallowProfileProps
      }
    }
  }

  ${shallowProfilePropsFragment}
  ${shallowUserPropsFragment}
`

export const signInMutation = gql`
  mutation SignInMutation($email: String!, $password: String!) {
    response: signIn(email: $email, password: $password) {
      ...ShallowSignInResponseProps
      error {
        ...ShallowResponseErrorProps
      }
    }
  }

  ${shallowResponseErrorPropsFragment}
  ${shallowSignInResponsePropsFragment}
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
        ...ShallowResponseErrorProps
      }
    }
  }

  ${shallowResponseErrorPropsFragment}
`
