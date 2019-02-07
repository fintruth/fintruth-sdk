import { GraphQLBoolean } from 'graphql'
import { Field, ObjectType } from 'type-graphql'

import Response, { Props as ResponseProps } from './response'

export interface Props extends ResponseProps {
  verified: boolean
}

@ObjectType()
export default class ConfirmTwoFactorResponse extends Response {
  @Field(() => GraphQLBoolean)
  verified: boolean

  constructor(props: Props) {
    super(props)
    this.verified = props.verified
  }
}
