import { object, string } from '@fintruth-sdk/validation'
import { Inject, Service } from 'typedi'

import { AllDaos } from 'models'
import { AddressInput } from 'resolvers/types'
import { Address } from '../entities'

@Service()
export default class AddressService {
  @Inject()
  daos: AllDaos

  toEntity = async ({ typeName, ...input }: AddressInput) => {
    const { id } = await this.daos.addressTypes.findByNameOrFail(typeName)

    return new Address({ typeId: id, ...input })
  }

  validateInput = (input: AddressInput) =>
    object<AddressInput>()
      .shape({
        city: string().required(),
        country: string().required(),
        line1: string().required(),
        line2: string(),
        postalCode: string().required(),
        subdivision: string().required(),
        typeName: string().required(),
      })
      .validate(input)
}
