import {
  Arg,
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
import { Response, ResponseError, UserResponse } from 'resolvers/types'
import { UserService } from 'services'
import { Email, Profile, User } from '../entities'

@Resolver(() => User)
export default class UserResolver {
  @Inject()
  daos: Daos

  @Inject()
  private readonly userService: UserService

  @Mutation(() => UserResponse)
  addEmail(@Arg('email') email: string, @Ctx() { user }: Context) {
    if (!user) {
      return new UserResponse({
        error: new ResponseError('Not authenticated'),
      })
    }

    return this.userService.addEmail(user.id, email)
  }

  @Mutation(() => UserResponse)
  removeEmail(@Arg('emailId') emailId: string, @Ctx() { user }: Context) {
    if (!user) {
      return new UserResponse({
        error: new ResponseError('Not authenticated'),
      })
    }

    return this.userService.removeEmail(user.id, emailId)
  }

  @Mutation(() => Response)
  async updatePassword(
    @Arg('newPassword') newPassword: string,
    @Arg('password') password: string,
    @Ctx() { user }: Context
  ) {
    if (!user) {
      return new Response({
        error: new ResponseError('Not authenticated'),
      })
    }

    return this.userService.updatePassword(user.id, password, newPassword)
  }

  @Query(() => User, { nullable: true })
  currentUser(@Ctx() { user }: Context) {
    return user ? this.daos.users.findOne(user.id) : null
  }

  @Query(() => User, { nullable: true })
  user(@Arg('id', () => ID) id: string) {
    return this.daos.users.findOne(id)
  }

  @Query(() => [User])
  users() {
    return this.daos.users.find()
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
