import { Field, ObjectType } from 'type-graphql'

import ResponseError from './response-error'

export interface ResponseParameters {
  error?: ResponseError
}

@ObjectType()
export default class Response {
  @Field(() => ResponseError, { nullable: true })
  error?: ResponseError

  constructor(params: ResponseParameters = {}) {
    this.error = params.error
  }
}
