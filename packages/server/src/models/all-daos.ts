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
  @InjectRepository() readonly addresses: AddressDao

  @InjectRepository() readonly addressTypes: AddressTypeDao

  @InjectRepository() readonly countries: CountryDao

  @InjectRepository() readonly emails: EmailDao

  @InjectRepository() readonly media: MediaDao

  @InjectRepository() readonly mediaTypes: MediaTypeDao

  @InjectRepository() readonly phones: PhoneDao

  @InjectRepository() readonly phoneTypes: PhoneTypeDao

  @InjectRepository() readonly profiles: ProfileDao

  @InjectRepository() readonly users: UserDao
}
