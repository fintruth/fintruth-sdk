import { Field, ObjectType } from 'type-graphql'

import { User } from '../../entities'
import { ResponseError } from './response-error'

@ObjectType()
export class LoginResponse {
  @Field({ nullable: true })
  error?: ResponseError

  @Field({ nullable: true })
  user?: User
}
