import {
  Arg,
  Authorized as Authenticated,
  Ctx,
  Mutation,
  Resolver,
} from 'type-graphql'
import { Inject } from 'typedi'

import { Context } from 'apollo'
import { ProfileInput, ProfileResponse } from 'resolvers/types'
import ProfileService from 'services/profile-service'
import { Profile } from '../entities'

@Resolver(() => Profile)
export default class ProfileResolver {
  @Inject()
  private readonly profileService: ProfileService

  @Authenticated()
  @Mutation(() => ProfileResponse)
  updateProfile(
    @Arg('input') input: ProfileInput,
    @Ctx() { ability, user }: Context
  ) {
    return user && this.profileService.updateByUser(user.id, input, ability)
  }
}
