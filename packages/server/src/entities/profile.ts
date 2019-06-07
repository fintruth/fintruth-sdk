import { Profile as ProfileEntity } from '@fintruth-sdk/common'
import { Field, ID, ObjectType } from 'type-graphql'
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm'

import User from './user'

@Entity()
@ObjectType()
export default class Profile extends ProfileEntity {
  @Field(() => ID)
  @PrimaryColumn('uuid')
  userId: string

  @Field()
  @Column()
  familyName: string

  @Field()
  @Column()
  givenName: string

  @OneToOne(() => User, ({ profile }) => profile, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User

  @Field()
  @CreateDateColumn()
  createdAt: Date

  @Field()
  @UpdateDateColumn()
  updatedAt: Date

  constructor(partial: Partial<Profile> = {}) {
    super()
    Object.assign(this, partial)
  }
}
