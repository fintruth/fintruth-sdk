import {
  ShallowProfile as QueriedProfile,
  ShallowResponseError as QueriedResponseError,
  ShallowUser,
  shallowProfilePropsFragment,
  shallowResponseErrorPropsFragment,
  shallowUserPropsFragment,
} from '@fintruth-sdk/common'
import gql from 'graphql-tag'

export interface CurrentUserQueryData {
  user?: QueriedUser
}

interface QueriedResponse {
  error: QueriedResponseError
}

interface QueriedUser extends ShallowUser {
  profile: QueriedProfile
}

export interface SignOutMutationData {
  response: QueriedResponse
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

export const signOutMutation = gql`
  mutation SignOutMutation {
    response: signOut {
      error {
        ...ShallowResponseErrorProps
      }
    }
  }

  ${shallowResponseErrorPropsFragment}
`
