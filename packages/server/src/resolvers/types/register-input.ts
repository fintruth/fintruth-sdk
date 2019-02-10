import { Field, InputType } from 'type-graphql'

@InputType()
export default class RegisterInput {
  @Field()
  email: string

  @Field()
  emailConfirm: string

  @Field()
  firstName: string

  @Field()
  lastName: string

  @Field()
  password: string
}
