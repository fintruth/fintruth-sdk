import { Field, ObjectType } from 'type-graphql'

import Response, { Props as ResponseProps } from './response'

export interface Props extends ResponseProps {
  dataUrl?: string
  secret?: string
}

@ObjectType()
export default class InitiateTwoFactorResponse extends Response {
  @Field({ nullable: true })
  dataUrl?: string

  @Field({ nullable: true })
  secret?: string

  constructor(props: Props) {
    super(props)
    this.dataUrl = props.dataUrl
    this.secret = props.secret
  }
}
