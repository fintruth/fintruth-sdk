import gql from 'graphql-tag'

export interface BaseEntity {
  id: string
  createdAt: string
  updatedAt: string
}

export const shallowBaseEntityPropsFragment = gql`
  fragment ShallowBaseEntityProps on BaseEntity {
    id
    createdAt
    updatedAt
  }
`
