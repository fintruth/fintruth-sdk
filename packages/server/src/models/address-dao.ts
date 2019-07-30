import { EntityRepository, Repository } from 'typeorm'

import { Address } from '../entities'

@EntityRepository(Address)
export default class AddressDao extends Repository<Address> {
  findById(id: string) {
    return this.findOne(id)
  }
}
