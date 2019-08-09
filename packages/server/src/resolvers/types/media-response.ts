import { MediaResponse as IMediaResponse } from '@fintruth-sdk/common'
import { Field, ObjectType } from 'type-graphql'

import Response, { Props as ResponseProps } from './response'
import { Media } from '../../entities'

interface Props extends ResponseProps {
  media?: Media
}

@ObjectType()
export default class MediaResponse extends Response implements IMediaResponse {
  @Field(() => Media, { nullable: true })
  media?: Media

  constructor(props: Props) {
    super(props)

    this.media = props.media
  }
}
