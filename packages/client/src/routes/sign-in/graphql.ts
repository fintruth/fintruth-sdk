import gql from 'graphql-tag'

export const signInMutation = gql`
  mutation SignInMutation($input: SignInInput!) {
    payload: signIn(input: $input) {
      error {
        id
        message
      }
      user {
        id
        email
        profile {
          firstName
          lastName
        }
      }
    }
  }
`

export const signInQuery = gql`
  query SignInQuery {
    user {
      id
      email
      profile {
        firstName
        lastName
      }
    }
  }
`
