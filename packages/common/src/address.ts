import gql from 'graphql-tag'

import { BaseEntity, shallowBaseEntityPropsFragment } from './base-entity'

export interface Address extends BaseEntity {
  city: string
  country: string
  line1: string
  line2?: string
  postalCode: string
  subdivision: string
  type: AddressType
  typeId: string
}

export interface AddressInput {
  city: string
  country: string
  line1: string
  line2?: string
  postalCode: string
  subdivision: string
  typeName: string
}

export interface AddressType {
  id: string
  name: string
}

export const shallowAddressPropsFragment = gql`
  fragment ShallowAddressProps on Address {
    ...ShallowBaseEntityProps
    city
    country
    line1
    line2
    postalCode
    subdivision
    typeId
  }

  ${shallowBaseEntityPropsFragment}
`

export const shallowAddressTypePropsFragment = gql`
  fragment ShallowAddressTypeProps on AddressType {
    id
    name
  }
`
