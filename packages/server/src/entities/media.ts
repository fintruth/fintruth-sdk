import { BaseMedia } from '@fintruth-sdk/common'
import { Field, ID, ObjectType } from 'type-graphql'
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

import MediaType from './media-type'

@Entity()
@ObjectType()
export default class Media extends BaseEntity implements BaseMedia {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string

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

  @Field(() => Date)
  @CreateDateColumn()
  createdAt: Date

  @Field(() => Date)
  @UpdateDateColumn()
  updatedAt: Date

  constructor(partialMedia: Partial<Media> = {}) {
    super()

    Object.assign(this, partialMedia)
  }
}
