import { User } from '@fintruth-sdk/common'
import gql from 'graphql-tag'

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
        familyName
        givenName
      }
    }
  }
`
