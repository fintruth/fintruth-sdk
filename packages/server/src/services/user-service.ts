import { isNil } from 'ramda'
import { Service } from 'typedi'
import { Repository } from 'typeorm'
import { InjectRepository } from 'typeorm-typedi-extensions'

import { User } from '../entities'

@Service()
export default class UserService {
  @InjectRepository(User)
  private userRepository: Repository<User>

  async emailAvailable(email: string) {
    return isNil(await this.userRepository.findOne({ email }))
  }

  async createUser(email: string, password: string): Promise<User> {
    const isAvailable = await this.emailAvailable(email)

    if (!isAvailable) {
      throw new Error('The email is already taken')
    }

    return this.userRepository.save({ email, password })
  }
}
