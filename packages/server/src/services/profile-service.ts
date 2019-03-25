import { InjectRepository } from 'typeorm-typedi-extensions'
import { Repository } from 'typeorm'
import { Service } from 'typedi'
import { ValidationError, object, string } from '@fintruth-sdk/validation'
import { is } from 'ramda'

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

  findByUserId(userId: string) {
    return this.profileRepository.findOne({ where: { userId } })
  }

  async update(userId: string, input: ProfileInput) {
    const schemaOrError = await object()
      .shape({
        firstName: string().required(),
        lastName: string().required(),
      })
      .validate(input)
      .catch((error: ValidationError) => error)

    if (is(ValidationError, schemaOrError)) {
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
