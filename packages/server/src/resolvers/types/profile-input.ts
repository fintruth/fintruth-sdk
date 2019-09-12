import { ProfileInput as IProfileInput } from '@fintruth-sdk/common'
import { object, string } from '@fintruth-sdk/validation'
import { Field, InputType } from 'type-graphql'

@InputType()
export default class ProfileInput implements IProfileInput {
  @Field()
  familyName: string

  @Field()
  givenName: string

  static validate = (input: ProfileInput) =>
    object<ProfileInput>()
      .shape({
        familyName: string().required(),
        givenName: string().required(),
      })
      .validate(input)
}
