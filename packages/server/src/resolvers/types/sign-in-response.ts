import { Field, ObjectType } from 'type-graphql'

import { ResponseError } from './response-error'
import { User } from 'entities/user'

@ObjectType()
export class SignInResponse {
  @Field(() => ResponseError, { nullable: true })
  error: ResponseError | null

  @Field(() => User, { nullable: true })
  user: User | null
}
