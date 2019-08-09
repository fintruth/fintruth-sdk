import { Media as IMedia } from '@fintruth-sdk/common'
import { Field, ID, ObjectType } from 'type-graphql'
import { Column, Entity, ManyToOne } from 'typeorm'

import BaseEntity from './base-entity'
import MediaType from './media-type'

@Entity()
@ObjectType()
export default class Media extends BaseEntity implements IMedia {
  @Field()
  @Column()
  mimeType: string

  @Field()
  @Column()
  name: string

  @Field()
  @Column()
  path: string

  @Field(() => MediaType)
  @ManyToOne(() => MediaType, ({ media }) => media, { eager: true })
  type: MediaType

  @Field(() => ID)
  @Column()
  typeId: string

  constructor(partialMedia: Partial<Media> = {}) {
    super()

    Object.assign(this, partialMedia)
  }
}
