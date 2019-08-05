import {
  Response,
  User,
  responsePropsFragment,
  userPropsFragment,
} from '@fintruth-sdk/common'
import gql from 'graphql-tag'

export interface CurrentUserQueryData {
  user?: User
}

export interface RecoverMutationData {
  response: Response
}

export interface RecoverMutationVariables {
  email: string
}

export const currentUserQuery = gql`
  query CurrentUserQuery {
    user: currentUser {
      ...UserProps
    }
  }
  ${userPropsFragment}
`

export const recoverMutation = gql`
  mutation RecoverMutation($email: String!) {
    response: recover(email: $email) {
      ...ResponseProps
    }
  }
  ${responsePropsFragment}
`
