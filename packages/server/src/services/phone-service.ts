import { object, string } from '@fintruth-sdk/validation'
import { CountryCode, parsePhoneNumber } from 'libphonenumber-js'
import { Inject, Service } from 'typedi'

import { AllDaos } from 'models'
import { PhoneInput } from 'resolvers/types'
import { Phone } from '../entities'

@Service()
export default class PhoneService {
  @Inject()
  daos: AllDaos

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
