import { Field, ObjectType } from 'type-graphql'

import { Profile, User } from '../../entities'
import { ResponseError } from './error'

@ObjectType()
export class Response {
  @Field({ nullable: true })
  error?: ResponseError
}

@ObjectType()
export class UserResponse {
  @Field({ nullable: true })
  error?: ResponseError

  @Field({ nullable: true })
  user?: User
}

@ObjectType()
export class ProfileResponse {
  @Field({ nullable: true })
  error?: ResponseError

  @Field({ nullable: true })
  profile?: Profile
}
