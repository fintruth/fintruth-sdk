import { Inject, Service } from 'typedi'

import { Ability } from 'auth'
import { Loggable, logAs } from 'logger'
import { Daos } from 'models'
import { ProfileInput, Response, ResponseError } from 'resolvers/types'
import { Profile } from '../entities'

@Service()
export default class ProfileService {
  @Inject()
  daos: Daos

  private log = logAs('ProfileService')

  private logDebug = (message: Loggable) => this.log(message, 'debug')

  toEntity = (input: ProfileInput) => new Profile(input)

  async findByUser(userId: string, ability: Ability) {
    ability.throwUnlessCan('read', new Profile({ userId }))

    const profile = await this.daos.profiles.findByUser(userId)

    return profile
  }

  async updateByUser(userId: string, input: ProfileInput, ability: Ability) {
    const isValid = await ProfileInput.validate(input).catch(this.logDebug)

    if (!isValid) {
      return new Response({
        error: new ResponseError(
          'There is an issue with the provided form values'
        ),
      })
    }

    ability.throwUnlessCan('update', new Profile({ userId }))

    await this.daos.profiles.update({ userId }, input)

    return new Response()
  }
}
