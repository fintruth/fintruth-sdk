import gql from 'graphql-tag'
import {
  EnableTwoFactorAuthAppResponse,
  ProfileInput,
  ProfileResponse,
  Response,
  User,
  UserResponse,
} from '@fintruth-sdk/shared'

export interface AccountQueryData {
  user?: User
}

export interface ConfirmTwoFactorAuthAppMutationData {
  response: Response
}

export interface ConfirmTwoFactorAuthAppMutationVariables {
  token: string
}

export interface DisableTwoFactorAuthAppMutationData {
  response: Response
}

export interface DisableTwoFactorAuthAppMutationVariables {
  token: string
}

export interface EnableTwoFactorAuthAppMutationData {
  response: EnableTwoFactorAuthAppResponse
}

export interface UpdateEmailMutationData {
  response: UserResponse
}

export interface UpdateEmailMutationVariables {
  newEmail: string
  password: string
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

export const accountQuery = gql`
  query AccountQuery {
    user: currentUser {
      id
      email
      isTwoFactorAuthEnabled
      profile {
        firstName
        lastName
      }
    }
  }
`

export const confirmTwoFactorAuthAppMutation = gql`
  mutation ConfirmTwoFactorAuthAppMutation($token: String!) {
    response: confirmTwoFactorAuthApp(token: $token) {
      error {
        message
      }
    }
  }
`

export const disableTwoFactorAuthAppMutation = gql`
  mutation DisableTwoFactorAuthAppMutation($token: String!) {
    response: disableTwoFactorAuthApp(token: $token) {
      error {
        message
      }
    }
  }
`

export const enableTwoFactorAuthAppMutation = gql`
  mutation EnableTwoFactorAuthAppMutation {
    response: enableTwoFactorAuthApp {
      dataUrl
      error {
        message
      }
      secret
    }
  }
`

export const updateEmailMutation = gql`
  mutation UpdateEmailMutation($newEmail: String!, $password: String!) {
    response: updateEmail(newEmail: $newEmail, password: $password) {
      error {
        message
      }
      user {
        id
        email
      }
    }
  }
`

export const updatePasswordMutation = gql`
  mutation UpdatePasswordMutation($newPassword: String!, $password: String!) {
    response: updatePassword(newPassword: $newPassword, password: $password) {
      error {
        message
      }
    }
  }
`

export const updateProfileMutation = gql`
  mutation UpdateProfileMutation($input: ProfileInput!) {
    response: updateProfile(input: $input) {
      error {
        message
      }
      profile {
        firstName
        lastName
      }
    }
  }
`
