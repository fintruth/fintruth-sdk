import gql from 'graphql-tag'

export const signInMutation = gql`
  mutation SignInMutation($email: String!, $password: String!) {
    response: login(email: $email, password: $password) {
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
    user {
      id
      email
    }
  }
`
