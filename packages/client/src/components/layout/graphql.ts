import gql from 'graphql-tag'

export const signOutMutation = gql`
  mutation SignOutMutation {
    response: signOut
  }
`

export const signOutQuery = gql`
  query SignOutQuery {
    user: currentUser {
      id
    }
  }
`
