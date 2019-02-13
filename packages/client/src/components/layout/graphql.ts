import gql from 'graphql-tag'

export const signOutMutation = gql`
  mutation SignOutMutation {
    response: signOut {
      error {
        id
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
        firstName
        lastName
      }
    }
  }
`
