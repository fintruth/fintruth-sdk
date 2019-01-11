import { Arg, ID, Query, Resolver } from 'type-graphql'
import { Repository } from 'typeorm'
import { InjectRepository } from 'typeorm-typedi-extensions'

import { User } from 'entities/user'

@Resolver(() => User)
export class UserResolver {
  @InjectRepository(User)
  private readonly users: Repository<User>

  @Query(() => User, { nullable: true })
  user(@Arg('id', () => ID) id: string): Promise<User | undefined> {
    return this.users.findOne(id)
  }
}
