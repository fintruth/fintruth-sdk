import gql from 'graphql-tag'

import { BaseEntity, shallowBaseEntityPropsFragment } from './base-entity'
import { Country } from './country'

export interface Phone extends BaseEntity {
  country: Country
  ext: string
  isVerified: boolean
  number: string
  type: PhoneType
  typeId: string
}

export interface PhoneInput {
  alpha2Code: string
  number: string
  typeName: string
}

export interface PhoneType {
  id: string
  name: string
}

export const shallowPhonePropsFragment = gql`
  fragment ShallowPhoneProps on Phone {
    ...ShallowBaseEntityProps
    ext
    isVerified
    number
    typeId
  }

  ${shallowBaseEntityPropsFragment}
`

export const shallowPhoneTypePropsFragment = gql`
  fragment ShallowPhoneTypeProps on PhoneType {
    id
    name
  }
`
