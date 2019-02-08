import { Field, ObjectType } from 'type-graphql'

import ResponseError from './response-error'

export interface Props {
  error?: ResponseError
  success: boolean
}

@ObjectType()
export default class Response {
  @Field(() => ResponseError, { nullable: true })
  error?: ResponseError

  @Field()
  success: boolean

  constructor(props: Props) {
    this.error = props.error
  }
}
