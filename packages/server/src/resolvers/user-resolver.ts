import { Arg, Ctx, ID, Query, Resolver } from 'type-graphql'
import { Repository } from 'typeorm'
import { InjectRepository } from 'typeorm-typedi-extensions'
import { Context } from 'apollo'
import { User } from 'entities/user'

@Resolver(() => User)
export class UserResolver {
  @InjectRepository(User)
  private readonly userRepository: Repository<User>

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
