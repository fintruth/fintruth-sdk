import { Field, ObjectType } from 'type-graphql'

import { User } from '../../entities'
import Response, { Props as ResponseProps } from './response'

export interface Props extends ResponseProps {
  user?: User
}

@ObjectType()
export default class SignInResponse extends Response {
  @Field(() => User, { nullable: true })
  user?: User

  constructor(props: Props) {
    super(props)
    this.user = props.user
  }
}
