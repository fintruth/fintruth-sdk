import { isNil } from 'ramda'
import { Service } from 'typedi'
import { Repository } from 'typeorm'
import { InjectRepository } from 'typeorm-typedi-extensions'

import { ResponseError, UserResponse } from 'resolvers/types'
import { User } from '../entities'

@Service()
export default class UserService {
  @InjectRepository(User)
  private userRepository: Repository<User>

  async emailAvailable(email: string) {
    return isNil(await this.userRepository.findOne({ email }))
  }

  findById(id: string) {
    return this.userRepository.findOne(id)
  }

  async createUser(email: string, password: string) {
    const isAvailable = await this.emailAvailable(email)

    if (!isAvailable) {
      return new UserResponse({
        error: new ResponseError('The email is not available'),
      })
    }

    const user = await this.userRepository.save({ email, password })

    return new UserResponse({ user })
  }
}
