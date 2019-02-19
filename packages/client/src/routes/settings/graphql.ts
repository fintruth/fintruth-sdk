import gql from 'graphql-tag'
import {
  ProfileInput,
  ProfileResponse,
  Response,
  User,
  UserResponse,
} from '@fintruth-sdk/shared'

export interface AccountQueryData {
  user?: User
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
      profile {
        firstName
        lastName
      }
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
