import { Field, InputType } from 'type-graphql'

@InputType()
export class RegistrationInput {
  @Field()
  email: string

  @Field()
  password: string
}
