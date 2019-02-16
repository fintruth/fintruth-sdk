import { Field, ObjectType } from 'type-graphql'
import { UserResponse as BaseUserResponse } from '@fintruth-sdk/shared'

import { User } from '../../entities'
import Response, { Props as ResponseProps } from './response'

export interface Props extends ResponseProps {
  user?: User
}

@ObjectType()
export default class UserResponse extends Response implements BaseUserResponse {
  @Field({ nullable: true })
  user?: User

  constructor(props: Props) {
    super(props)
    this.user = props.user
  }
}
