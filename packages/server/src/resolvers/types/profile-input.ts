import { Field, InputType } from 'type-graphql'

@InputType()
export default class ProfileInput {
  @Field()
  firstName: string

  @Field()
  lastName: string
}
