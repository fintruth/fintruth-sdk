import { SignInResponse as ISignInResponse } from '@fintruth-sdk/common'
import { Field, ObjectType } from 'type-graphql'

import Response, { Props as ResponseProps } from './response'

interface Props extends ResponseProps {
  isTwoFactorAuthEnabled?: boolean
}

@ObjectType()
export default class SignInResponse extends Response
  implements ISignInResponse {
  @Field({ nullable: true })
  isTwoFactorAuthEnabled?: boolean

  constructor(props: Props) {
    super(props)

    this.isTwoFactorAuthEnabled = props.isTwoFactorAuthEnabled
  }
}
