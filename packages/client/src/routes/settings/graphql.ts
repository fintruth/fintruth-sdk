import {
  Profile,
  ProfileInput,
  ResponseError,
  ShallowEnableTwoFactorAuthResponse,
  ShallowUser,
  shallowEnableTwoFactorAuthResponsePropsFragment,
  shallowProfilePropsFragment,
  shallowResponseErrorPropsFragment,
  shallowUserPropsFragment,
} from '@fintruth-sdk/common'
import gql from 'graphql-tag'

interface QueriedEnableTwoFactorAuthResponse
  extends ShallowEnableTwoFactorAuthResponse {
  error: ResponseError
}

interface QueriedResponse {
  error: ResponseError
}

interface QueriedUser extends ShallowUser {
  profile: Profile
}

export interface ConfirmTwoFactorAuthMutationData {
  response: QueriedResponse
}

export interface ConfirmTwoFactorAuthMutationVariables {
  token: string
}

export interface CurrentUserQueryData {
  user?: QueriedUser
}

export interface DisableTwoFactorAuthMutationData {
  response: QueriedResponse
}

export interface DisableTwoFactorAuthMutationVariables {
  token: string
}

export interface EnableTwoFactorAuthMutationData {
  response: QueriedEnableTwoFactorAuthResponse
}

export interface UpdatePasswordMutationData {
  response: QueriedResponse
}

export interface UpdatePasswordMutationVariables {
  newPassword: string
  password: string
}

export interface UpdateProfileMutationData {
  response: QueriedResponse
}

export interface UpdateProfileMutationVariables {
  input: ProfileInput
}

export const confirmTwoFactorAuthMutation = gql`
  mutation ConfirmTwoFactorAuthMutation($token: String!) {
    response: confirmTwoFactorAuth(token: $token) {
      error {
        ...ShallowResponseErrorProps
      }
    }
  }

  ${shallowResponseErrorPropsFragment}
`

export const currentProfileQuery = gql`
  query CurrentProfileQuery {
    profile: currentProfile {
      ...ShallowProfileProps
    }
  }

  ${shallowProfilePropsFragment}
`

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

export const disableTwoFactorAuthMutation = gql`
  mutation DisableTwoFactorAuthMutation($token: String!) {
    response: disableTwoFactorAuth(token: $token) {
      error {
        ...ShallowResponseErrorProps
      }
    }
  }

  ${shallowResponseErrorPropsFragment}
`

export const enableTwoFactorAuthMutation = gql`
  mutation EnableTwoFactorAuthMutation {
    response: enableTwoFactorAuth {
      ...ShallowEnableTwoFactorAuthResponseProps
      error {
        ...ShallowResponseErrorProps
      }
    }
  }

  ${shallowResponseErrorPropsFragment}
  ${shallowEnableTwoFactorAuthResponsePropsFragment}
`

export const shallowCurrentUserQuery = gql`
  query ShallowCurrentUserQuery {
    user: currentUser {
      ...ShallowUserProps
    }
  }

  ${shallowUserPropsFragment}
`

export const updatePasswordMutation = gql`
  mutation UpdatePasswordMutation($newPassword: String!, $password: String!) {
    response: updatePassword(newPassword: $newPassword, password: $password) {
      error {
        ...ShallowResponseErrorProps
      }
    }
  }

  ${shallowResponseErrorPropsFragment}
`

export const updateProfileMutation = gql`
  mutation UpdateProfileMutation($input: ProfileInput!) {
    response: updateProfile(input: $input) {
      error {
        ...ShallowResponseErrorProps
      }
    }
  }

  ${shallowResponseErrorPropsFragment}
`
