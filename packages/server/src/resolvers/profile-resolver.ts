import { Arg, Ctx, Mutation, Resolver } from 'type-graphql'
import { Inject } from 'typedi'

import ProfileService from 'services/profile-service'
import { Context } from 'apollo'
import { ProfileResponse, UpdateProfileInput } from 'resolvers/types'
import { Profile } from '../entities'

@Resolver(() => Profile)
export default class ProfileResolver {
  @Inject()
  profileService: ProfileService

  @Mutation(() => ProfileResponse)
  async updateProfile(
    @Arg('input') input: UpdateProfileInput,
    @Ctx() { user }: Context
  ) {
    if (!user) {
      return {
        error: {
          id: '5e5e2d7e-b21f-450e-b1f0-9997f4898f6a',
          message: 'Not authenticated',
        },
      }
    }

    return this.profileService.update(user.id, input)
  }
}
