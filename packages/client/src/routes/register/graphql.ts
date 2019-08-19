import {
  RegisterInput,
  ResponseError,
  Shallow,
  shallowResponseErrorPropsFragment,
} from '@fintruth-sdk/common'
import gql from 'graphql-tag'

type QueriedResponseError = Shallow<ResponseError>

interface QueriedResponse {
  error: QueriedResponseError
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
