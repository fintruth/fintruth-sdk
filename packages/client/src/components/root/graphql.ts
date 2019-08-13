import {
  ShallowProfile as QueriedProfile,
  ShallowUser,
  shallowProfilePropsFragment,
  shallowUserPropsFragment,
} from '@fintruth-sdk/common'
import gql from 'graphql-tag'

export interface CurrentUserQueryData {
  user?: QueriedUser
}

interface QueriedUser extends ShallowUser {
  profile: QueriedProfile
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
