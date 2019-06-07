import { ProfileInput as BaseProfileInput } from '@fintruth-sdk/common'
import { Field, InputType } from 'type-graphql'

@InputType()
export default class ProfileInput implements BaseProfileInput {
  @Field()
  familyName: string

  @Field()
  givenName: string
}
