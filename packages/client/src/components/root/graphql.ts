import {
  Profile,
  Queried,
  User,
  shallowProfilePropsFragment,
  shallowUserPropsFragment,
} from '@fintruth-sdk/common'
import gql from 'graphql-tag'

type QueriedProfile = Queried<Profile>

export interface CurrentUserQueryData {
  user?: QueriedUser
}

interface QueriedUser extends Queried<User> {
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
