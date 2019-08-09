import gql from 'graphql-tag'

import { BaseEntity } from './base-entity'
import { Response, responseErrorPropsFragment } from './response'

export interface Profile extends BaseEntity {
  familyName: string
  givenName: string
  userId: string
}

export interface ProfileInput {
  familyName: string
  givenName: string
}

export interface ProfileResponse extends Response {
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
