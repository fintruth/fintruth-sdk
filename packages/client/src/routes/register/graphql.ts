import gql from 'graphql-tag'
import { RegisterInput, Response } from '@fintruth-sdk/shared'

export interface RegisterMutationData {
  response: Response
}

export interface RegisterMutationVariables {
  input: RegisterInput
}

export const registerMutation = gql`
  mutation RegisterMutation($input: RegisterInput!) {
    response: register(input: $input) {
      error {
        message
      }
    }
  }
`
