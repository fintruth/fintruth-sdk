import {
  Profile,
  ResponseError,
  Shallow,
  SignInResponse,
  User,
  shallowProfilePropsFragment,
  shallowResponseErrorPropsFragment,
  shallowSignInResponsePropsFragment,
  shallowUserPropsFragment,
} from '@fintruth-sdk/common'
import gql from 'graphql-tag'

type QueriedProfile = Shallow<Profile>

type QueriedResponseError = Shallow<ResponseError>

export interface CurrentUserQueryData {
  user?: QueriedUser
}

interface QueriedResponse {
  error: QueriedResponseError
}

interface QueriedSignInResponse extends Shallow<SignInResponse> {
  error: QueriedResponseError
}

interface QueriedUser extends Shallow<User> {
  profile: QueriedProfile
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
