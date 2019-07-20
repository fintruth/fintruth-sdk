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

import { Context } from 'apollo'
import { ProfileDao, UserDao } from 'models'
import { Response, ResponseError } from 'resolvers/types'
import { UserService } from 'services'
import { Profile, User } from '../entities'

@Resolver(() => User)
export default class UserResolver {
  @InjectRepository(Profile)
  private readonly profileDao: ProfileDao

  @InjectRepository(User)
  private readonly userDao: UserDao

  @Inject()
  private readonly userService: UserService

  @FieldResolver(() => Profile)
  profile(@Root() { id }: User) {
    return this.profileDao.findByUserId(id)
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
    return user ? this.userDao.findOne(user.id) : null
  }

  @Query(() => User, { nullable: true })
  user(@Arg('id', () => ID) id: string) {
    return this.userDao.findOne(id)
  }

  @Query(() => [User])
  users() {
    return this.userDao.find()
  }
}
