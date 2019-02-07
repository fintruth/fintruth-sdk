import { GraphQLBoolean } from 'graphql'
import { Field, ObjectType } from 'type-graphql'

import Response, { ResponseProps } from './response'

export interface ConfirmTwoFactorResponseProps extends ResponseProps {
  verified: boolean
}

@ObjectType()
export default class ConfirmTwoFactorResponse extends Response {
  @Field(() => GraphQLBoolean)
  verified: boolean

  constructor(props: ConfirmTwoFactorResponseProps) {
    super(props)
    this.verified = props.verified
  }
}
