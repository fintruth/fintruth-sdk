import gql from 'graphql-tag'

export const registerMutation = gql`
  mutation RegisterMutation($input: RegisterInput!) {
    payload: register(input: $input) {
      error {
        id
        message
      }
    }
  }
`
