import { Service } from 'typedi'
import { InjectRepository } from 'typeorm-typedi-extensions'

import AddressDao from './address-dao'
import AddressTypeDao from './address-type-dao'
import CountryDao from './country-dao'
import EmailDao from './email-dao'
import MediaDao from './media-dao'
import MediaTypeDao from './media-type-dao'
import PhoneDao from './phone-dao'
import PhoneTypeDao from './phone-type-dao'
import ProfileDao from './profile-dao'
import UserDao from './user-dao'

@Service()
export default class AllDaos {
  @InjectRepository()
  addresses: AddressDao

  @InjectRepository()
  addressTypes: AddressTypeDao

  @InjectRepository()
  countries: CountryDao

  @InjectRepository()
  emails: EmailDao

  @InjectRepository()
  media: MediaDao

  @InjectRepository()
  mediaTypes: MediaTypeDao

  @InjectRepository()
  phones: PhoneDao

  @InjectRepository()
  phoneTypes: PhoneTypeDao

  @InjectRepository()
  profiles: ProfileDao

  @InjectRepository()
  users: UserDao
}
