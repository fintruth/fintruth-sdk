import {
  Email,
  ResponseError,
  ShallowUser,
  shallowEmailPropsFragment,
  shallowResponseErrorPropsFragment,
  shallowUserPropsFragment,
} from '@fintruth-sdk/common'
import gql from 'graphql-tag'

interface QueriedResponse {
  error: ResponseError
}

export interface QueriedUser extends ShallowUser {
  emails: Email[]
}

export interface CurrentUserQueryData {
  user?: QueriedUser
}

export interface RecoverMutationData {
  response: QueriedResponse
}

export interface RecoverMutationVariables {
  email: string
}

export const currentUserQuery = gql`
  query CurrentUserQuery {
    user: currentUser {
      ...ShallowUserProps
      emails {
        ...ShallowEmailProps
      }
    }
  }

  ${shallowEmailPropsFragment}
  ${shallowUserPropsFragment}
`

export const recoverMutation = gql`
  mutation RecoverMutation($email: String!) {
    response: recover(email: $email) {
      error {
        ...ShallowResponseErrorProps
      }
    }
  }

  ${shallowResponseErrorPropsFragment}
`
