import gql from 'graphql-tag'

export interface BaseEmail {
  id: string
  isPrimary: boolean
  isVerified: boolean
  userId: string
  value: string
}

export interface Email extends BaseEmail {
  createdAt: string
  updatedAt: string
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
