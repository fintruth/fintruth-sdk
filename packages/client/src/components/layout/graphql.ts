import {
  Profile,
  ResponseError,
  ShallowUser,
  shallowProfilePropsFragment,
  shallowResponseErrorPropsFragment,
  shallowUserPropsFragment,
} from '@fintruth-sdk/common'
import gql from 'graphql-tag'

interface QueriedResponse {
  error: ResponseError
}

interface QueriedUser extends ShallowUser {
  profile: Profile
}

export interface CurrentUserQueryData {
  user?: QueriedUser
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
