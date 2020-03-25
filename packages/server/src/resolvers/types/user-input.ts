import { UserInput as IUserInput } from '@fintruth-sdk/common'
import { boolean, object, string } from '@fintruth-sdk/validation'
import { Field, InputType } from 'type-graphql'

import ProfileInput from './profile-input'

@InputType()
export default class UserInput implements IUserInput {
  @Field()
  email: string

  @Field({ nullable: true })
  isAdmin?: boolean

  @Field()
  password: string

  @Field(() => ProfileInput)
  profile: ProfileInput

  static validate = async ({ profile, ...input }: UserInput) => {
    await ProfileInput.validate(profile)

    return object()
      .shape({
        email: string().required().email(),
        isAdmin: boolean(),
        password: string().required().password(2),
      })
      .validate({ profile, ...input })
  }
}
