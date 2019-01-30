import gql from 'graphql-tag'

export const recoverMutation = gql`
  mutation RecoverMutation($email: String!) {
    response: recover(email: $email) {
      error {
        id
        message
      }
    }
  }
`
