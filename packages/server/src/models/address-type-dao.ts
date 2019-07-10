import { Service } from 'typedi'
import { EntityRepository, Repository } from 'typeorm'

import { AddressType } from '../entities'

@EntityRepository(AddressType)
@Service()
export default class AddressTypeDao extends Repository<AddressType> {
  findByNameOrFail(name: string) {
    return this.findOneOrFail({ name })
  }
}
