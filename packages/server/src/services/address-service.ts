import { object, string } from '@fintruth-sdk/validation'
import { Inject, Service } from 'typedi'
import { Ability } from '@casl/ability'

import { Daos } from 'models'
import { AddressInput } from 'resolvers/types'
import { Address } from '../entities'

@Service()
export default class AddressService {
  @Inject()
  daos: Daos

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

  async findById(id: string, ability: Ability) {
    const address = await this.daos.addresses.findById(id)

    ability.throwUnlessCan('read', address)

    return address
  }
}
