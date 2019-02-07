import { Field, ObjectType } from 'type-graphql'

import ResponseError from './response-error'

export interface Props {
  error?: ResponseError
}

@ObjectType()
export default class Response {
  @Field(() => ResponseError, { nullable: true })
  error?: ResponseError

  constructor(props: Props = {}) {
    this.error = props.error
  }
}
