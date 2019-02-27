import gql from 'graphql-tag'
import { User } from '@fintruth-sdk/shared'

export interface RootQueryData {
  user?: User
}

export const rootQuery = gql`
  query RootQuery {
    user: currentUser {
      id
      email
      isTwoFactorAuthEnabled
      profile {
        firstName
        lastName
      }
    }
  }
`
