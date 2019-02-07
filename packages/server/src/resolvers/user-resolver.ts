import {
  Arg,
  Ctx,
  FieldResolver,
  ID,
  Query,
  Resolver,
  Root,
} from 'type-graphql'
import { Inject } from 'typedi'
import { InjectRepository } from 'typeorm-typedi-extensions'
import { Repository } from 'typeorm'

import ProfileService from 'services/profile-service'
import { Profile, User } from '../entities'
import { Context } from 'apollo'

@Resolver(() => User)
export default class UserResolver {
  @Inject()
  private readonly profileService: ProfileService

  @InjectRepository(User)
  private readonly userRepository: Repository<User>

  @FieldResolver(() => Profile)
  profile(@Root() { id }: User) {
    return this.profileService.findByUserId(id)
  }

  @Query(() => User, { nullable: true })
  currentUser(@Ctx() { user }: Context) {
    return user ? this.userRepository.findOne(user.id) : null
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
