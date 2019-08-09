import { ProfileResponse as IProfileResponse } from '@fintruth-sdk/common'
import { Field, ObjectType } from 'type-graphql'

import Response, { Props as ResponseProps } from './response'
import { Profile } from '../../entities'

interface Props extends ResponseProps {
  profile?: Profile
}

@ObjectType()
export default class ProfileResponse extends Response
  implements IProfileResponse {
  @Field(() => Profile, { nullable: true })
  profile?: Profile

  constructor(props: Props) {
    super(props)

    this.profile = props.profile
  }
}
