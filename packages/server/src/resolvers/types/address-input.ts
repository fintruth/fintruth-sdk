import { AddressInput as IAddressInput } from '@fintruth-sdk/common'
import { Field, InputType } from 'type-graphql'

@InputType()
export default class AddressInput implements IAddressInput {
  @Field()
  city: string

  @Field()
  country: string

  @Field()
  line1: string

  @Field({ nullable: true })
  line2?: string

  @Field()
  postalCode: string

  @Field()
  subdivision: string

  @Field()
  typeName: string
}
