import { RegisterInput, Response } from '@fintruth-sdk/shared'
import gql from 'graphql-tag'

export interface RegisterMutationData {
  response: Response
}

export interface RegisterMutationVariables {
  input: RegisterInput
}

export const registerMutation = gql`
  mutation registerMutation($input: RegisterInput!) {
    response: register(input: $input) {
      error {
        message
      }
    }
  }
`
