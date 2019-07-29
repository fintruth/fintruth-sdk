import { EntityRepository, Repository } from 'typeorm'

import { Email } from '../entities'

@EntityRepository(Email)
export default class EmailDao extends Repository<Email> {
  findById(id: string) {
    return this.findOne(id)
  }

  findByUser(userId: string) {
    return this.find({ userId })
  }
}
