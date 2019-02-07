import { Field, ObjectType } from 'type-graphql'

import ResponseError from './response-error'

export interface ResponseProps {
  error?: ResponseError
}

@ObjectType()
export default class Response {
  @Field(() => ResponseError, { nullable: true })
  error?: ResponseError

  constructor(props: ResponseProps = {}) {
    this.error = props.error
  }
}
