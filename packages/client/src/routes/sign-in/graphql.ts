import gql from 'graphql-tag'

export const signInMutation = gql`
  mutation SignInMutation($email: String!, $password: String!) {
    response: signIn(email: $email, password: $password) {
      error {
        id
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
    user {
      id
      email
    }
  }
`
