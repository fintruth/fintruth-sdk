import AddressType from './address-type'

export default class BaseAddress {
  id: string
  adviserId?: string
  applicantId?: string
  city: string
  country: string
  line1: string
  line2: string
  organizationId?: string
  postalCode: string
  subdivision: string
  type: AddressType
  typeId: string
}
