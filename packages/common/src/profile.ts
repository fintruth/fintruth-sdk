import gql from 'graphql-tag'

import { Response, responseErrorPropsFragment } from './response'

export interface BaseProfile {
  id: string
  familyName: string
  givenName: string
  userId: string
}

export interface Profile extends BaseProfile {
  createdAt: string
  updatedAt: string
}

export interface ProfileInput {
  familyName: string
  givenName: string
}

export interface BaseProfileResponse extends Response {
  profile?: BaseProfile
}

export interface ProfileResponse extends BaseProfileResponse {
  profile?: Profile
}

export const profilePropsFragment = gql`
  fragment ProfileProps on Profile {
    id
    familyName
    givenName
    userId
    createdAt
    updatedAt
  }
`

export const profileResponsePropsFragment = gql`
  fragment ProfileResponseProps on ProfileResponse {
    error {
      ...ResponseErrorProps
    }
    profile {
      ...ProfileProps
    }
  }
  ${profilePropsFragment}
  ${responseErrorPropsFragment}
`
