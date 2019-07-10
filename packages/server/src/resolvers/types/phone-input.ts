import { PhoneInput as BasePhoneInput } from '@fintruth-sdk/common'
import { Field, InputType } from 'type-graphql'

@InputType()
export default class PhoneInput implements BasePhoneInput {
  @Field()
  alpha2Code: string

  @Field()
  number: string

  @Field()
  typeName: string
}
