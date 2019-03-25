import { Arg, Ctx, Mutation, Resolver } from 'type-graphql'
import { Inject } from 'typedi'

import ProfileService from 'services/profile-service'
import { Context } from 'apollo'
import { ProfileInput, ProfileResponse, ResponseError } from 'resolvers/types'
import { Profile } from '../entities'

@Resolver(() => Profile)
export default class ProfileResolver {
  @Inject()
  profileService: ProfileService

  @Mutation(() => ProfileResponse)
  async updateProfile(
    @Arg('input') input: ProfileInput,
    @Ctx() { user }: Context
  ) {
    if (!user) {
      return new ProfileResponse({
        error: new ResponseError('Not authenticated'),
      })
    }

    return this.profileService.update(user.id, input)
  }
}
