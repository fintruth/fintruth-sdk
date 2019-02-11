import gql from 'graphql-tag'

export const signInMutation = gql`
  mutation SignInMutation($email: String!, $password: String!) {
    response: signIn(email: $email, password: $password) {
      error {
        message
      }
      user {
        id
        email
      }
    }
  }
`

export const signInQuery = gql`
  query SignInQuery {
    user: currentUser {
      id
      email
    }
  }
`
