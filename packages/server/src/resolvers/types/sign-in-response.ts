import { Field, ObjectType } from 'type-graphql'

import { User } from '../../entities'
import Response, { ResponseProps } from './response'

export interface SignInResponseProps extends ResponseProps {
  user?: User
}

@ObjectType()
export default class SignInResponse extends Response {
  @Field(() => User, { nullable: true })
  user?: User

  constructor(props: SignInResponseProps = {}) {
    super(props)
    this.user = props.user
  }
}
