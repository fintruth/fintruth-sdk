import gql from 'graphql-tag'
import { Response, User } from '@fintruth-sdk/shared'

export interface LayoutQueryData {
  user?: User
}

export interface SignOutMutationData {
  response: Response
}

export const signOutMutation = gql`
  mutation SignOutMutation {
    response: signOut {
      error {
        message
      }
    }
  }
`

export const layoutQuery = gql`
  query LayoutQuery {
    user: currentUser {
      id
      profile {
        familyName
        givenName
      }
    }
  }
`
