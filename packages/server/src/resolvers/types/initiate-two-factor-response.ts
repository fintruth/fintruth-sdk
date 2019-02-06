import { GraphQLString } from 'graphql'
import { Field, ObjectType } from 'type-graphql'

import { ResponseError } from './response-error'

@ObjectType()
export default class InitiateTwoFactorResponse {
  @Field(() => ResponseError, { nullable: true })
  error: ResponseError | null

  @Field(() => GraphQLString, { nullable: true })
  dataUrl: string | null

  @Field(() => GraphQLString, { nullable: true })
  secret: string | null
}
