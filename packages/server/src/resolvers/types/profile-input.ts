import { Field, InputType } from 'type-graphql'
import { ProfileInput as BaseProfileInput } from '@fintruth-sdk/shared'

@InputType()
export default class ProfileInput implements BaseProfileInput {
  @Field()
  firstName: string

  @Field()
  lastName: string
}
