import { isNil } from 'ramda'
import { Service } from 'typedi'
import { Repository } from 'typeorm'
import { InjectRepository } from 'typeorm-typedi-extensions'

import { User } from 'entities/user'

@Service()
export class UserService {
  @InjectRepository(User)
  private userRepository: Repository<User>

  authenticate(email: string, _: string) {
    return this.userRepository.findOne({ email })
  }

  async emailAvailable(email: string) {
    return isNil(await this.userRepository.findOne({ email }))
  }

  async register(email: string, _: string) {
    const isAvailable = await this.emailAvailable(email)
    const getToken = () => 'register_token'

    return isAvailable ? getToken() : undefined
  }
}
