import gql from 'graphql-tag'

import { BaseEntity, shallowBaseEntityPropsFragment } from './base-entity'

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
