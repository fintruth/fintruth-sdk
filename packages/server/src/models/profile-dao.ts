import { EntityRepository, Repository } from 'typeorm'

import { Profile } from '../entities'

@EntityRepository(Profile)
export default class ProfileDao extends Repository<Profile> {
  findById(id: string) {
    return this.findOne(id)
  }

  findByUser(userId: string) {
    return this.findOne({ userId })
  }
}
