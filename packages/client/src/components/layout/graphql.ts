import {
  Response,
  User,
  responsePropsFragment,
  userPropsFragment,
} from '@fintruth-sdk/common'
import gql from 'graphql-tag'

export interface CurrentUserQueryData {
  user?: User
}

export interface SignOutMutationData {
  response: Response
}

export const currentUserQuery = gql`
  query CurrentUserQuery {
    user: currentUser {
      ...UserProps
    }
  }
  ${userPropsFragment}
`

export const signOutMutation = gql`
  mutation SignOutMutation {
    response: signOut {
      ...ResponseProps
    }
  }
  ${responsePropsFragment}
`
