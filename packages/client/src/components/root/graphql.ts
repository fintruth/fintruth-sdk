import { User, userPropsFragment } from '@fintruth-sdk/common'
import gql from 'graphql-tag'

export interface CurrentUserQueryData {
  user?: User
}

export const currentUserQuery = gql`
  query CurrentUserQuery {
    user: currentUser {
      ...UserProps
    }
  }
  ${userPropsFragment}
`
