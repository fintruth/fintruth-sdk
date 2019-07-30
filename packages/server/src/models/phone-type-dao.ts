import { EntityRepository, Repository } from 'typeorm'

import { PhoneType } from '../entities'

@EntityRepository(PhoneType)
export default class PhoneTypeDao extends Repository<PhoneType> {
  findByNameOrFail(name: string) {
    return this.findOneOrFail({ name })
  }
}
