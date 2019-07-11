export interface BaseAddress {
  id: string
  city: string
  country: string
  line1: string
  line2?: string
  postalCode: string
  subdivision: string
  type: AddressType
  typeId: string
}

export interface Address extends BaseAddress {
  createdAt: string
  updatedAt: string
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
