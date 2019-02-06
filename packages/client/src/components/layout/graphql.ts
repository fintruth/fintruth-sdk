import gql from 'graphql-tag'

export const signOutMutation = gql`
  mutation SignOutMutation {
    response: signOut
  }
`

export const layoutQuery = gql`
  query LayoutQuery {
    user: currentUser {
      id
      profile {
        firstName
        lastName
      }
    }
  }
`
