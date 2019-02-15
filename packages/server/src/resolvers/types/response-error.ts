import uuid from 'uuid/v4'
import { Field, ID, ObjectType } from 'type-graphql'
import { ResponseError as BaseResponseError } from '@fintruth-sdk/shared'

@ObjectType()
export default class ResponseError implements BaseResponseError {
  @Field(() => ID)
  id: string

  @Field()
  message: string

  constructor(message: string) {
    this.id = uuid()
    this.message = message
  }
}
