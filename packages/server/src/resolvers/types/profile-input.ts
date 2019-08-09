import { ProfileInput as IProfileInput } from '@fintruth-sdk/common'
import { Field, InputType } from 'type-graphql'

@InputType()
export default class ProfileInput implements IProfileInput {
  @Field()
  familyName: string

  @Field()
  givenName: string
}
