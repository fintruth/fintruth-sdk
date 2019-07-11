import AddressType from './address-type'

export default class BaseAddress {
  id: string

  city: string

  country: string

  line1: string

  line2: string

  postalCode: string

  subdivision: string

  type: AddressType

  typeId: string
}
