import { Field, ObjectType } from 'type-graphql'

import { Profile } from '../../entities'
import ResponseError from './response-error'

@ObjectType()
export default class ProfileResponse {
  @Field({ nullable: true })
  error?: ResponseError

  @Field({ nullable: true })
  profile?: Profile
}
