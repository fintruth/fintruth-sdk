import gql from 'graphql-tag'
import { Response } from '@fintruth-sdk/shared'

export interface RecoverMutationData {
  response: Response
}

export interface RecoverMutationVariables {
  email: string
}

export const recoverMutation = gql`
  mutation RecoverMutation($email: String!) {
    response: recover(email: $email) {
      error {
        message
      }
    }
  }
`
