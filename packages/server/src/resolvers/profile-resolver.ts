import { Inject } from 'typedi'
import { FieldResolver, Resolver, Root } from 'type-graphql'
import UserService from 'services/user-service'
import { Profile, User } from 'entities'

@Resolver(() => Profile)
export default class ProfileResolver {
  @Inject()
  private readonly userService: UserService

  @FieldResolver(() => User)
  user(@Root() { userId }: Profile) {
    return this.userService.findById(userId)
  }
}
