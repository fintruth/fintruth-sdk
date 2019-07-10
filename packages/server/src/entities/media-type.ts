import { MediaType as BaseMediaType } from '@fintruth-sdk/common'
import { Field, ID, ObjectType } from 'type-graphql'
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'

import Media from './media'

@Entity()
@ObjectType()
export default class MediaType extends BaseEntity implements BaseMediaType {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string

  @OneToMany(() => Media, ({ type }) => type)
  media: Media[]

  @Field()
  @Column()
  name: string

  constructor(partialMediaType: Partial<MediaType> = {}) {
    super()

    Object.assign(this, partialMediaType)
  }
}
