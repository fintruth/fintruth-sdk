import { InjectRepository } from 'typeorm-typedi-extensions'
import { Repository } from 'typeorm'
import { Service } from 'typedi'
import { ValidationError, object, string } from '@fintruth-sdk/validation'
import { is } from 'ramda'

import { ProfileInput } from 'resolvers/types'
import { Profile } from '../entities'

@Service()
export default class ProfileService {
  @InjectRepository(Profile)
  private readonly profileRepository: Repository<Profile>

  findByUserId(userId: string) {
    return this.profileRepository.findOne({ where: { userId } })
  }

  async update(userId: string, input: ProfileInput) {
    const schema = object().shape({
      firstName: string().required(),
      lastName: string().required(),
    })

    const schemaOrError = await schema
      .validate(input)
      .catch((error: ValidationError) => error)

    if (is(ValidationError, schemaOrError)) {
      return {
        error: {
          id: '8cf575e7-e073-481b-8be1-e7a3b7f8baf4',
          message: 'There is an issue with the provided form values',
        },
      }
    }

    await this.profileRepository.save({ userId, ...input })

    return {
      profile: await this.profileRepository.findOne({ where: { userId } }),
    }
  }
}
