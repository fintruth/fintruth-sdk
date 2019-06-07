import { RegisterInput as BaseRegisterInput } from '@fintruth-sdk/common'
import { Field, InputType } from 'type-graphql'

import ProfileInput from './profile-input'

@InputType()
export default class RegisterInput implements BaseRegisterInput {
  @Field()
  email: string

  @Field()
  password: string

  @Field()
  profile: ProfileInput
}
