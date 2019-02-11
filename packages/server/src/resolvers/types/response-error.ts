import { Field, ID, ObjectType } from 'type-graphql'
import uuid from 'uuid/v4'

@ObjectType()
export default class ResponseError {
  @Field(() => ID)
  id: string

  @Field()
  message: string

  constructor(message: string) {
    this.id = uuid()
    this.message = message
  }
}
