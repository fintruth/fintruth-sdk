import { ResponseError as BaseResponseError } from '@fintruth-sdk/common'
import { Field, ID, ObjectType } from 'type-graphql'
import uuid from 'uuid/v4'

@ObjectType()
export default class ResponseError implements BaseResponseError {
  @Field(() => ID)
  id: string

  @Field()
  message: string

  constructor(message: string, id: string = uuid()) {
    this.id = id
    this.message = message
  }
}
