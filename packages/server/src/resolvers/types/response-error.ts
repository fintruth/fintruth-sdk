import { Field, ID, ObjectType } from 'type-graphql'

@ObjectType()
export default class ResponseError {
  @Field(() => ID)
  id: string

  @Field()
  message: string
}
