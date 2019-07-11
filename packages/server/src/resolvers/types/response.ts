import { Response as BaseResponse } from '@fintruth-sdk/common'
import { Field, ObjectType } from 'type-graphql'

import ResponseError from './response-error'

export interface Props {
  error?: ResponseError
}

@ObjectType()
export default class Response implements BaseResponse {
  @Field(() => ResponseError, { nullable: true })
  error?: ResponseError

  constructor(props: Props = {}) {
    this.error = props.error
  }
}
