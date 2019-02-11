import gql from 'graphql-tag'

export const registerMutation = gql`
  mutation RegisterMutation($input: RegisterInput!) {
    response: register(input: $input) {
      error {
        message
      }
    }
  }
`
