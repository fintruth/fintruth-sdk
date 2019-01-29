import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class ResponseError {
  @Field()
  message: string
}
