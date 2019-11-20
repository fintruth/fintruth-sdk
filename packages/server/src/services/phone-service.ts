import { CountryCode, parsePhoneNumber } from 'libphonenumber-js'
import { Inject, Service } from 'typedi'

import { Ability } from 'auth'
import { Daos } from 'models'
import { PhoneInput } from 'resolvers/types'
import { Phone } from '../entities'

@Service()
export default class PhoneService {
  @Inject()
  daos: Daos

  toEntity = async ({ alpha2Code, number, typeName }: PhoneInput) => {
    const { id: countryId } = await this.daos.countries.findByAlpha2CodeOrFail(
      alpha2Code
    )
    const { id: typeId } = await this.daos.phoneTypes.findByNameOrFail(typeName)

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

  async findById(id: string, ability: Ability) {
    const phone = await this.daos.phones.findById(id)

    ability.throwUnlessCan('read', phone)

    return phone
  }
}
