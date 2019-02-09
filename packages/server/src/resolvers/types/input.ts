import { Field, InputType } from 'type-graphql'

@InputType()
export class ProfileInput {
  @Field()
  firstName: string

  @Field()
  lastName: string
}

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
