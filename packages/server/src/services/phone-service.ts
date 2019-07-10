import { object, string } from '@fintruth-sdk/validation'
import { CountryCode, parsePhoneNumber } from 'libphonenumber-js'
import { Service } from 'typedi'
import { InjectRepository } from 'typeorm-typedi-extensions'

import { PhoneInput } from 'resolvers/types'
import { CountryDao, PhoneTypeDao } from 'models'
import { Country, Phone, PhoneType } from '../entities'

@Service()
export default class PhoneService {
  @InjectRepository(Country)
  countryDao: CountryDao

  @InjectRepository(PhoneType)
  phoneTypeDao: PhoneTypeDao

  toEntity = async ({ alpha2Code, number, typeName }: PhoneInput) => {
    const { id: countryId } = await this.countryDao.findByAlpha2CodeOrFail(
      alpha2Code
    )
    const { id: typeId } = await this.phoneTypeDao.findByNameOrFail(typeName)

    const { ext, nationalNumber } = parsePhoneNumber(
      number,
      alpha2Code as CountryCode
    )

    return new Phone({
      countryId,
      number: nationalNumber as string,
      typeId,
      ...(ext ? { ext: ext as string } : {}),
    })
  }

  validateInput = ({ alpha2Code, ...input }: PhoneInput) =>
    object<PhoneInput>()
      .shape({
        alpha2Code: string().required(),
        number: string()
          .required()
          .phone({ defaultCountry: alpha2Code as CountryCode }),
        typeName: string().required(),
      })
      .validate({ alpha2Code, ...input })
}
