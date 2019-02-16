import { Field, InputType } from 'type-graphql'
import { RegisterInput as BaseRegisterInput } from '@fintruth-sdk/shared'

@InputType()
export default class RegisterInput implements BaseRegisterInput {
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
