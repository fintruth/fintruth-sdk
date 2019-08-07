import { object, string } from '@fintruth-sdk/validation'
import { Inject, Service } from 'typedi'

import { Ability } from 'auth'
import { Loggable, logAs } from 'logger'
import { Daos } from 'models'
import { ProfileInput, ProfileResponse, ResponseError } from 'resolvers/types'
import { Profile } from '../entities'

@Service()
export default class ProfileService {
  @Inject()
  daos: Daos

  private log = logAs('ProfileService')

  private logDebug = (message: Loggable) => this.log(message, 'debug')

  toEntity = (input: ProfileInput) => new Profile(input)

  validateInput = (input: ProfileInput) =>
    object<ProfileInput>()
      .shape({
        familyName: string().required(),
        givenName: string().required(),
      })
      .validate(input)

  async updateByUser(userId: string, input: ProfileInput, ability: Ability) {
    const isValid = await this.validateInput(input).catch(this.logDebug)

    if (!isValid) {
      return new ProfileResponse({
        error: new ResponseError(
          'There is an issue with the provided form values'
        ),
      })
    }

    ability.throwUnlessCan('update', new Profile({ userId }))

    await this.daos.profiles.update({ userId }, input)

    return new ProfileResponse({
      profile: await this.daos.profiles.findByUser(userId),
    })
  }
}
