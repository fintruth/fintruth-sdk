import { EntityRepository, Repository } from 'typeorm'

import { PhoneType } from '../entities'

@EntityRepository(PhoneType)
export default class PhoneTypeDao extends Repository<PhoneType> {
  findById(id: string) {
    return this.findOne(id)
  }

  findByNameOrFail(name: string) {
    return this.findOneOrFail({ name })
  }
}
