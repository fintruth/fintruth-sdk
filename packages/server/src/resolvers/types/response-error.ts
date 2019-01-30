import { Field, ID, ObjectType } from 'type-graphql'

@ObjectType()
export class ResponseError {
  @Field(() => ID)
  id: string

  @Field()
  message: string
}
