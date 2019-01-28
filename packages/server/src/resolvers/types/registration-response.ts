import { Field, ObjectType } from 'type-graphql'

import { ResponseError } from './response-error'

@ObjectType()
export class RegistrationResponse {
  @Field({ nullable: true })
  error?: ResponseError

  @Field({ nullable: true })
  token?: string
}
