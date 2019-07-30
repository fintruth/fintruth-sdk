import { EntityRepository, Repository } from 'typeorm'

import { AddressType } from '../entities'

@EntityRepository(AddressType)
export default class AddressTypeDao extends Repository<AddressType> {
  findById(id: string) {
    return this.findOne(id)
  }

  findByNameOrFail(name: string) {
    return this.findOneOrFail({ name })
  }
}
