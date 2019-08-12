import gql from 'graphql-tag'

import { BaseEntity, shallowBaseEntityPropsFragment } from './base-entity'
import { Country } from './country'

export interface ShallowPhone extends BaseEntity {
  ext: string
  isVerified: boolean
  number: string
  typeId: string
}

export interface Phone extends ShallowPhone {
  country: Country
  type: PhoneType
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

export const shallowPhoneTypePropsFragment = gql`
  fragment ShallowPhoneTypeProps on PhoneType {
    id
    name
  }
`

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
