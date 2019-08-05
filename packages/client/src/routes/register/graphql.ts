import {
  RegisterInput,
  Response,
  responsePropsFragment,
} from '@fintruth-sdk/common'
import gql from 'graphql-tag'

export interface RegisterMutationData {
  response: Response
}

export interface RegisterMutationVariables {
  input: RegisterInput
}

export const registerMutation = gql`
  mutation RegisterMutation($input: RegisterInput!) {
    response: register(input: $input) {
      ...ResponseProps
    }
  }
  ${responsePropsFragment}
`
