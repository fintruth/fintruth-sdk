import { BaseEntity } from './base-entity'
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
