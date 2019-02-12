import { Field, ObjectType } from 'type-graphql'

import UserResponse, { Props as ResponseProps } from './user-response'

export interface Props extends ResponseProps {
  isTwoFactorEnabled?: boolean
}

@ObjectType()
export default class SignInResponse extends UserResponse {
  @Field({ nullable: true })
  isTwoFactorEnabled?: boolean

  constructor(props: Props) {
    super(props)
    this.isTwoFactorEnabled = props.isTwoFactorEnabled
  }
}
