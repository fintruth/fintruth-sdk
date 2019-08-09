import { PhoneInput as IPhoneInput } from '@fintruth-sdk/common'
import { Field, InputType } from 'type-graphql'

@InputType()
export default class PhoneInput implements IPhoneInput {
  @Field()
  alpha2Code: string

  @Field()
  number: string

  @Field()
  typeName: string
}
