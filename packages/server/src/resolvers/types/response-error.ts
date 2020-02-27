import { ResponseError as IResponseError } from '@fintruth-sdk/common'
import { Field, ID, ObjectType } from 'type-graphql'
import { v4 as uuid } from 'uuid'

@ObjectType()
export default class ResponseError implements IResponseError {
  @Field(() => ID)
  id: string

  @Field()
  message: string

  constructor(message: string, id: string = uuid()) {
    this.id = id
    this.message = message
  }
}
