import gql from 'graphql-tag'
import { Response, User } from '@fintruth-sdk/shared'

export interface RecoverMutationData {
  response: Response
}

export interface RecoverMutationVariables {
  email: string
}

export interface RecoverQueryData {
  user?: User
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

export const recoverQuery = gql`
  query RecoverQuery {
    user: currentUser {
      id
      email
    }
  }
`
