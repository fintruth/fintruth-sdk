import gql from 'graphql-tag'

export const registerMutation = gql`
  mutation RegisterMutation($input: RegistrationInput!) {
    response: register(input: $input) {
      error {
        message
      }
      token
    }
  }
`
