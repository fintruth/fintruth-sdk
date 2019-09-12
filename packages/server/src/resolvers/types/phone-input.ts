import { PhoneInput as IPhoneInput } from '@fintruth-sdk/common'
import { object, string } from '@fintruth-sdk/validation'
import { CountryCode } from 'libphonenumber-js'
import { Field, InputType } from 'type-graphql'

@InputType()
export default class PhoneInput implements IPhoneInput {
  @Field()
  alpha2Code: string

  @Field()
  number: string

  @Field()
  typeName: string

  static validate = ({ alpha2Code, ...input }: PhoneInput) =>
    object<PhoneInput>()
      .shape({
        alpha2Code: string().required(),
        number: string()
          .required()
          .phone({ defaultCountry: alpha2Code as CountryCode }),
        typeName: string().required(),
      })
      .validate({ alpha2Code, ...input })
}
