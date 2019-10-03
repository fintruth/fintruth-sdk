import {
  Arg,
  Authorized as Authenticated,
  Ctx,
  Mutation,
  Query,
  Resolver,
} from 'type-graphql'
import { Inject } from 'typedi'

import { AuthContext, Context } from 'apollo'
import { ProfileInput, Response } from 'resolvers/types'
import ProfileService from 'services/profile-service'
import { Profile } from '../entities'

@Resolver(() => Profile)
export default class ProfileResolver {
  @Inject()
  private readonly profileService: ProfileService

  @Authenticated()
  @Mutation(() => Response)
  updateProfile(
    @Arg('input') input: ProfileInput,
    @Ctx() { ability, user }: AuthContext
  ) {
    return this.profileService.updateByUser(user.id, input, ability)
  }

  @Query(() => Profile, { nullable: true })
  currentProfile(@Ctx() { ability, user }: Context) {
    return user ? this.profileService.findByUser(user.id, ability) : null
  }
}
