import {
  Profile,
  ResponseError,
  Shallow,
  User,
  shallowProfilePropsFragment,
  shallowResponseErrorPropsFragment,
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

interface QueriedUser extends Shallow<User> {
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
