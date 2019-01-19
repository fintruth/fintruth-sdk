import gql from 'graphql-tag'

export const signInMutation = gql`
  mutation SignInMutation($input: SignInInput!) {
    user: signIn(input: $input) {
      id
      email
      profile {
        firstName
        lastName
      }
    }
  }
`

export const signInQuery = gql`
  query SignInQuery {
    user: currentUser {
      id
      email
      profile {
        firstName
        lastName
      }
    }
  }
`
