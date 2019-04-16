import { object, string } from '@fintruth-sdk/validation'
import { Service } from 'typedi'
import { Repository } from 'typeorm'
import { InjectRepository } from 'typeorm-typedi-extensions'

import { logAs, Loggable } from 'logger'
import {
  ProfileInput,
  ProfileResponse,
  ResponseError,
  UserResponse,
} from 'resolvers/types'
import { Profile } from '../entities'

@Service()
export default class ProfileService {
  @InjectRepository(Profile)
  private readonly profileRepository: Repository<Profile>

  private log = logAs('ProfileService')
  private logDebug = (message: Loggable) => this.log(message, 'debug')

  findByUserId(userId: string) {
    return this.profileRepository.findOne({ where: { userId } })
  }

  async update(userId: string, input: ProfileInput) {
    const valid = await object()
      .shape({
        firstName: string().required(),
        lastName: string().required(),
      })
      .validate(input)
      .catch(this.logDebug)

    if (!valid) {
      return new UserResponse({
        error: new ResponseError(
          'There is an issue with the provided form values'
        ),
      })
    }

    await this.profileRepository.update(userId, input)

    return new ProfileResponse({ profile: await this.findByUserId(userId) })
  }
}
