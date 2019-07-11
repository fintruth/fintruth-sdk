import Country from './country'
import PhoneType from './phone-type'

export default class BasePhone {
  id: string

  country: Country

  ext: string

  isVerified: boolean

  number: string

  type: PhoneType

  typeId: string
}
