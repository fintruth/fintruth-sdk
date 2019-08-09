import { RegisterInput as IRegisterInput } from '@fintruth-sdk/common'
import { Field, InputType } from 'type-graphql'

import ProfileInput from './profile-input'

@InputType()
export default class RegisterInput implements IRegisterInput {
  @Field()
  email: string

  @Field()
  password: string

  @Field(() => ProfileInput)
  profile: ProfileInput
}
