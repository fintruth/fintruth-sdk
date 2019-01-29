import { Field, ObjectType } from 'type-graphql'

import { ResponseError } from './response-error'
import { User } from 'entities/user'

@ObjectType()
export class LoginResponse {
  @Field({ nullable: true })
  error?: ResponseError

  @Field({ nullable: true })
  user?: User
}
