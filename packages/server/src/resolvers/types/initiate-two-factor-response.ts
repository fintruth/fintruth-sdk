import { GraphQLString } from 'graphql'
import { Field, ObjectType } from 'type-graphql'

import Response, { ResponseProps } from './response'

export interface InitiateTwoFactorResponseProps extends ResponseProps {
  dataUrl?: string
  secret?: string
}

@ObjectType()
export default class InitiateTwoFactorResponse extends Response {
  @Field(() => GraphQLString, { nullable: true })
  dataUrl?: string

  @Field(() => GraphQLString, { nullable: true })
  secret?: string

  constructor(props: InitiateTwoFactorResponseProps) {
    super(props)
    this.dataUrl = props.dataUrl
    this.secret = props.secret
  }
}
