import { BaseEntity } from './base-entity'

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
