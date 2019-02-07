import { Field, ObjectType } from 'type-graphql'

import { User } from '../../entities'
import Response, { ResponseParameters } from './response'

export interface SignInResponseParameters extends ResponseParameters {
  user?: User
}

@ObjectType()
export default class SignInResponse extends Response {
  @Field(() => User, { nullable: true })
  user?: User

  constructor(params: SignInResponseParameters = {}) {
    super(params)
    this.user = params.user
  }
}
