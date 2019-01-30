import { Field, InputType } from 'type-graphql'

@InputType()
export class RegisterInput {
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
