import { Field, ObjectType } from 'type-graphql'

import { ResponseError } from './response-error'

@ObjectType()
export class RegisterResponse {
  @Field(() => ResponseError, { nullable: true })
  error: ResponseError | null
}
