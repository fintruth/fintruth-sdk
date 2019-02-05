import { Field, ObjectType } from 'type-graphql'
import { User } from '../../entities'
import { ResponseError } from './response-error'

@ObjectType()
export class SignInResponse {
  @Field(() => ResponseError, { nullable: true })
  error: ResponseError | null

  @Field(() => User, { nullable: true })
  user: User | null
}
