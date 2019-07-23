import {
  EnableTwoFactorAuthResponse,
  ProfileInput,
  ProfileResponse,
  Response,
  User,
  UserResponse,
} from '@fintruth-sdk/common'
import gql from 'graphql-tag'

export interface AccountQueryData {
  user?: User
}

export interface ConfirmTwoFactorAuthMutationData {
  response: Response
}

export interface ConfirmTwoFactorAuthMutationVariables {
  token: string
}

export interface DisableTwoFactorAuthMutationData {
  response: Response
}

export interface DisableTwoFactorAuthMutationVariables {
  token: string
}

export interface EnableTwoFactorAuthMutationData {
  response: EnableTwoFactorAuthResponse
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
      emails {
        id
        value
      }
      isTwoFactorAuthEnabled
      profile {
        familyName
        givenName
      }
    }
  }
`

export const confirmTwoFactorAuthMutation = gql`
  mutation ConfirmTwoFactorAuthMutation($token: String!) {
    response: confirmTwoFactorAuth(token: $token) {
      error {
        message
      }
    }
  }
`

export const disableTwoFactorAuthMutation = gql`
  mutation DisableTwoFactorAuthMutation($token: String!) {
    response: disableTwoFactorAuth(token: $token) {
      error {
        message
      }
    }
  }
`

export const enableTwoFactorAuthMutation = gql`
  mutation EnableTwoFactorAuthMutation {
    response: enableTwoFactorAuth {
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
        emails {
          id
          value
        }
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
        familyName
        givenName
      }
    }
  }
`
