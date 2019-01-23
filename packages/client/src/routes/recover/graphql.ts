import gql from 'graphql-tag'

export const recoverMutation = gql`
  mutation RecoverMutation($input: RecoverInput!) {
    payload: recover(input: $input) {
      error {
        id
        message
      }
    }
  }
`
