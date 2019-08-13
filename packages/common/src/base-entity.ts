import gql from 'graphql-tag'

import { Primitive, SubType } from 'utils'

export type ShallowBaseEntity = SubType<BaseEntity, Primitive>

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
