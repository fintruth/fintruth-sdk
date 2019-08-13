import gql from 'graphql-tag'

import { Primitive, SubType } from 'utils'
import { BaseEntity, shallowBaseEntityPropsFragment } from './base-entity'

export type ShallowProfile = SubType<Profile, Primitive>

export interface Profile extends BaseEntity {
  familyName: string
  givenName: string
  userId: string
}

export interface ProfileInput {
  familyName: string
  givenName: string
}

export const shallowProfilePropsFragment = gql`
  fragment ShallowProfileProps on Profile {
    ...ShallowBaseEntityProps
    familyName
    givenName
    userId
  }

  ${shallowBaseEntityPropsFragment}
`
