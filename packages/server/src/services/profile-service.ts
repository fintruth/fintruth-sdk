import { InjectRepository } from 'typeorm-typedi-extensions'
import { Repository } from 'typeorm'
import { Service } from 'typedi'
import Profile from 'entities/profile'

@Service()
export default class ProfileService {
  @InjectRepository(Profile)
  private readonly profileRepository: Repository<Profile>

  findByUserId(userId: string) {
    return this.profileRepository.findOne({ where: { userId } })
  }
}
