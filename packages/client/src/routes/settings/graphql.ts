import {
  EnableTwoFactorAuthResponse,
  ProfileInput,
  ProfileResponse,
  Response,
  User,
  UserResponse,
  enableTwoFactorAuthResponsePropsFragment,
  profileResponsePropsFragment,
  responsePropsFragment,
  userPropsFragment,
  userResponsePropsFragment,
} from '@fintruth-sdk/common'
import gql from 'graphql-tag'

export interface ConfirmTwoFactorAuthMutationData {
  response: UserResponse
}

export interface ConfirmTwoFactorAuthMutationVariables {
  token: string
}

export interface CurrentUserQueryData {
  user?: User
}

export interface DisableTwoFactorAuthMutationData {
  response: UserResponse
}

export interface DisableTwoFactorAuthMutationVariables {
  token: string
}

export interface EnableTwoFactorAuthMutationData {
  response: EnableTwoFactorAuthResponse
}

export interface UpdatePasswordMutationData {
  response: Response
}

export interface UpdatePasswordMutationVariables {
  newPassword: string
  password: string
}

export interface UpdateProfileMutationData {
  response: ProfileResponse
}

export interface UpdateProfileMutationVariables {
  input: ProfileInput
}

export const confirmTwoFactorAuthMutation = gql`
  mutation ConfirmTwoFactorAuthMutation($token: String!) {
    response: confirmTwoFactorAuth(token: $token) {
      ...UserResponseProps
    }
  }
  ${userResponsePropsFragment}
`

export const currentUserQuery = gql`
  query CurrentUserQuery {
    user: currentUser {
      ...UserProps
    }
  }
  ${userPropsFragment}
`

export const disableTwoFactorAuthMutation = gql`
  mutation DisableTwoFactorAuthMutation($token: String!) {
    response: disableTwoFactorAuth(token: $token) {
      ...UserResponseProps
    }
  }
  ${userResponsePropsFragment}
`

export const enableTwoFactorAuthMutation = gql`
  mutation EnableTwoFactorAuthMutation {
    response: enableTwoFactorAuth {
      ...EnableTwoFactorAuthResponseProps
    }
  }
  ${enableTwoFactorAuthResponsePropsFragment}
`

export const updatePasswordMutation = gql`
  mutation UpdatePasswordMutation($newPassword: String!, $password: String!) {
    response: updatePassword(newPassword: $newPassword, password: $password) {
      ...ResponseProps
    }
  }
  ${responsePropsFragment}
`

export const updateProfileMutation = gql`
  mutation UpdateProfileMutation($input: ProfileInput!) {
    response: updateProfile(input: $input) {
      ...ProfileResponseProps
    }
  }
  ${profileResponsePropsFragment}
`
