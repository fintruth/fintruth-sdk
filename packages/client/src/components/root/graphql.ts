import {
  Profile,
  ShallowUser,
  shallowProfilePropsFragment,
  shallowUserPropsFragment,
} from '@fintruth-sdk/common'
import gql from 'graphql-tag'

interface QueriedUser extends ShallowUser {
  profile: Profile
}

export interface CurrentUserQueryData {
  user?: QueriedUser
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
