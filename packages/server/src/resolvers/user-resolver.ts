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
import { InjectRepository } from 'typeorm-typedi-extensions'
import { Repository } from 'typeorm'

import ProfileService from 'services/profile-service'
import UserService from 'services/user-service'
import { Context } from 'apollo'
import { Response, ResponseError, UserResponse } from 'resolvers/types'
import { Profile, User } from '../entities'

@Resolver(() => User)
export default class UserResolver {
  @Inject()
  private readonly profileService: ProfileService

  @Inject()
  private readonly userService: UserService

  @InjectRepository(User)
  private readonly userRepository: Repository<User>

  @FieldResolver(() => Profile)
  profile(@Root() { id }: User) {
    return this.profileService.findByUserId(id)
  }

  @Mutation(() => UserResponse)
  async updateEmail(
    @Arg('newEmail') newEmail: string,
    @Arg('password') password: string,
    @Ctx() { user }: Context
  ) {
    if (!user) {
      return new UserResponse({
        error: new ResponseError('Not authenticated'),
      })
    }

    return this.userService.updateEmail(user.id, password, newEmail)
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
    return user
  }

  @Query(() => User, { nullable: true })
  user(@Arg('id', () => ID) id: string) {
    return this.userRepository.findOne(id)
  }

  @Query(() => [User])
  users() {
    return this.userRepository.find()
  }
}
