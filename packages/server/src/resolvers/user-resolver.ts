import {
  Arg,
  Authorized as Authenticated,
  Ctx,
  FieldResolver,
  ID,
  Mutation,
  Query,
  Resolver,
  Root,
} from 'type-graphql'
import { Inject } from 'typedi'

import { Context } from 'apollo'
import { Daos } from 'models'
import { Response, UserResponse } from 'resolvers/types'
import { UserService } from 'services'
import { Email, Profile, User } from '../entities'

@Resolver(() => User)
export default class UserResolver {
  @Inject()
  daos: Daos

  @Inject()
  private readonly userService: UserService

  @Authenticated()
  @Mutation(() => UserResponse)
  addEmail(@Arg('value') value: string, @Ctx() { ability, user }: Context) {
    return user && this.userService.addEmail(user.id, value, ability)
  }

  @Authenticated()
  @Mutation(() => UserResponse)
  removeEmail(
    @Arg('emailId') emailId: string,
    @Ctx() { ability, user }: Context
  ) {
    return user && this.userService.removeEmail(user.id, emailId, ability)
  }

  @Authenticated()
  @Mutation(() => Response)
  async updatePassword(
    @Arg('newPassword') newPassword: string,
    @Arg('password') password: string,
    @Ctx() { ability, user }: Context
  ) {
    return (
      user &&
      this.userService.updatePassword(user.id, password, newPassword, ability)
    )
  }

  @Query(() => User, { nullable: true })
  currentUser(@Ctx() { ability, user }: Context) {
    return user ? this.userService.findById(user.id, ability) : null
  }

  @Query(() => User, { nullable: true })
  user(@Arg('id', () => ID) id: string, @Ctx() { ability }: Context) {
    return this.userService.findById(id, ability)
  }

  @Query(() => [User])
  users(@Ctx() { ability }: Context) {
    return this.userService.getAll(ability)
  }

  @FieldResolver(() => Profile)
  profile(@Root() { id }: User) {
    return this.daos.profiles.findByUser(id)
  }

  @FieldResolver(() => [Email])
  emails(@Root() { id }: User) {
    return this.daos.emails.findByUser(id)
  }
}
