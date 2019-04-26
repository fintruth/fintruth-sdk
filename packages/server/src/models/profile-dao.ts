import { Service } from 'typedi'
import { EntityRepository, Repository } from 'typeorm'

import { Profile } from '../entities'

@Service()
@EntityRepository(Profile)
export default class ProfileDao extends Repository<Profile> {
  findByUserId(id: string) {
    return this.findOne(id)
  }
}
