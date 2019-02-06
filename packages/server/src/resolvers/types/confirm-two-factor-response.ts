import { GraphQLBoolean } from 'graphql'
import { Field, ObjectType } from 'type-graphql'

import { ResponseError } from './response-error'

@ObjectType()
export default class ConfirmTwoFactorResponse {
  @Field(() => ResponseError, { nullable: true })
  error: ResponseError | null

  @Field(() => GraphQLBoolean, { nullable: true })
  verified: boolean | null
}
