import { Country } from './country'

export interface BasePhone {
  id: string
  country: Country
  ext: string
  isVerified: boolean
  number: string
  type: PhoneType
  typeId: string
}

export interface Phone extends BasePhone {
  createdAt: string
  updatedAt: string
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
