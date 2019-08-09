import gql from 'graphql-tag'

import { BaseEntity } from './base-entity'

export interface Email extends BaseEntity {
  isPrimary: boolean
  isVerified: boolean
  userId: string
  value: string
}

export const emailPropsFragment = gql`
  fragment EmailProps on Email {
    id
    isPrimary
    isVerified
    userId
    value
    createdAt
    updatedAt
  }
`
