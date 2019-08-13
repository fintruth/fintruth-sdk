import gql from 'graphql-tag'

import { Primitive, SubType } from 'utils'
import { BaseEntity, shallowBaseEntityPropsFragment } from './base-entity'

export type ShallowEmail = SubType<Email, Primitive>

export interface Email extends BaseEntity {
  isPrimary: boolean
  isVerified: boolean
  userId: string
  value: string
}

export const shallowEmailPropsFragment = gql`
  fragment ShallowEmailProps on Email {
    ...ShallowBaseEntityProps
    isPrimary
    isVerified
    userId
    value
  }

  ${shallowBaseEntityPropsFragment}
`
