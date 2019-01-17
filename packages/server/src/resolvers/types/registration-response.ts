import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class RegistrationResponse {
  @Field()
  token: string
}
