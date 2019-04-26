import { object, string } from '@fintruth-sdk/validation'
import { Service } from 'typedi'
import { InjectRepository } from 'typeorm-typedi-extensions'

import { logAs, Loggable } from 'logger'
import { ProfileDao } from 'models'
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
  profileDao: ProfileDao

  private log = logAs('ProfileService')
  private logDebug = (message: Loggable) => this.log(message, 'debug')

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

    await this.profileDao.update(userId, input)

    return new ProfileResponse({
      profile: await this.profileDao.findByUserId(userId),
    })
  }
}
