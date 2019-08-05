import { object, string } from '@fintruth-sdk/validation'
import { mergeLeft } from 'ramda'
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

  async update(id: string, input: ProfileInput, ability: Ability) {
    const isValid = await this.validateInput(input).catch(this.logDebug)

    if (!isValid) {
      return new ProfileResponse({
        error: new ResponseError(
          'There is an issue with the provided form values'
        ),
      })
    }

    const profile = await this.daos.profiles.findOneOrFail(id)

    ability.throwUnlessCan('update', profile)

    const updated = await this.daos.profiles.save(mergeLeft(input, profile))

    return new ProfileResponse({
      profile: ability.can('read', profile) ? updated : undefined,
    })
  }
}
