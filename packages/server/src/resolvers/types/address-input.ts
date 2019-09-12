import { AddressInput as IAddressInput } from '@fintruth-sdk/common'
import { object, string } from '@fintruth-sdk/validation'
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

  static validate = (input: AddressInput) =>
    object<AddressInput>()
      .shape({
        city: string().required(),
        country: string().required(),
        line1: string().required(),
        line2: string(),
        postalCode: string().required(),
        subdivision: string().required(),
        typeName: string().required(),
      })
      .validate(input)
}
