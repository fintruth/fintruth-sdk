import { RegisterInput, Response } from '@fintruth-sdk/shared'
import gql from 'graphql-tag'

export interface RegisterFormMutationData {
  response: Response
}

export interface RegisterFormMutationVariables {
  input: RegisterInput
}

export const registerFormMutation = gql`
  mutation RegisterFormMutation($input: RegisterInput!) {
    response: register(input: $input) {
      error {
        message
      }
    }
  }
`
