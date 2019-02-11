import { Field, ObjectType } from 'type-graphql'

import ResponseError from './response-error'

@ObjectType()
export default class Response {
  @Field({ nullable: true })
  error?: ResponseError
}
