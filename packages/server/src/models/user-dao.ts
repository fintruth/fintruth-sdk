import { Service } from 'typedi'
import { EntityRepository, Repository } from 'typeorm'

import { User } from '../entities'

@EntityRepository(User)
@Service()
export default class UserDao extends Repository<User> {
  findByEmail(email: string) {
    return this.findOne({ email })
  }

  findById(id: string) {
    return this.findOne(id)
  }
}
