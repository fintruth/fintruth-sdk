import {
  Profile,
  Shallow,
  User,
  shallowProfilePropsFragment,
  shallowUserPropsFragment,
} from '@fintruth-sdk/common'
import gql from 'graphql-tag'

type QueriedProfile = Shallow<Profile>

export interface CurrentUserQueryData {
  user?: QueriedUser
}

interface QueriedUser extends Shallow<User> {
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
