import { RegisterInput as IRegisterInput } from '@fintruth-sdk/common'
import { object, string } from '@fintruth-sdk/validation'
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

  static validate = async ({ profile, ...input }: RegisterInput) => {
    await ProfileInput.validate(profile)

    return object<RegisterInput>()
      .shape({
        email: string().required().email(),
        password: string().required().password(2),
      })
      .validate({ profile, ...input })
  }
}
