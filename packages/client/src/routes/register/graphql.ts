import {
  RegisterInput,
  ResponseError,
  shallowResponseErrorPropsFragment,
} from '@fintruth-sdk/common'
import gql from 'graphql-tag'

interface QueriedResponse {
  error: ResponseError
}

export interface RegisterMutationData {
  response: QueriedResponse
}

export interface RegisterMutationVariables {
  input: RegisterInput
}

export const registerMutation = gql`
  mutation RegisterMutation($input: RegisterInput!) {
    response: register(input: $input) {
      error {
        ...ShallowResponseErrorProps
      }
    }
  }

  ${shallowResponseErrorPropsFragment}
`
