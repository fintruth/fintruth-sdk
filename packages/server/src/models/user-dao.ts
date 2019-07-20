import { Service } from 'typedi'
import { EntityRepository, Repository } from 'typeorm'

import { Email, User } from '../entities'

@EntityRepository(User)
@Service()
export default class UserDao extends Repository<User> {
  findByEmail(value: string) {
    return this.createQueryBuilder('u')
      .innerJoin(Email, 'e', 'e."userId" = u.id')
      .where('e.value = :value', { value })
      .getOne()
  }

  findById(id: string) {
    return this.findOne(id)
  }
}
