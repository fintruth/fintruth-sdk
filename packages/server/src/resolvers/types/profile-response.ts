import { Field, ObjectType } from 'type-graphql'
import { ProfileResponse as BaseProfileResponse } from '@fintruth-sdk/shared'

import { Profile } from '../../entities'
import Response, { Props as ResponseProps } from './response'

export interface Props extends ResponseProps {
  profile?: Profile
}

@ObjectType()
export default class ProfileResponse extends Response
  implements BaseProfileResponse {
  @Field({ nullable: true })
  profile?: Profile

  constructor(props: Props) {
    super(props)
    this.profile = props.profile
  }
}
