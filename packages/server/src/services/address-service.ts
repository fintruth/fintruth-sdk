import { Ability } from '@casl/ability'
import { Inject, Service } from 'typedi'

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

  async findById(id: string, ability: Ability) {
    const address = await this.daos.addresses.findById(id)

    ability.throwUnlessCan('read', address)

    return address
  }
}
