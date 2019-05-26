import { UserResponse as BaseUserResponse } from '@fintruth-sdk/shared'
import { Field, ObjectType } from 'type-graphql'

import Response, { Props as ResponseProps } from './response'
import { User } from '../../entities'

interface Props extends ResponseProps {
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
