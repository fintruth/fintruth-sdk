import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Field, ID, ObjectType } from 'type-graphql'
import { Profile as ProfileEntity } from '@fintruth-sdk/shared'

import User from './user'

@ObjectType()
@Entity()
export default class Profile extends ProfileEntity {
  @Field(() => ID)
  @PrimaryColumn('uuid')
  userId: string

  @Field()
  @Column()
  firstName: string

  @Field()
  @Column()
  lastName: string

  @OneToOne(() => User, ({ profile }) => profile, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User

  @Field()
  @CreateDateColumn()
  createdAt: Date

  @Field()
  @UpdateDateColumn()
  updatedAt: Date

  constructor(partial: Partial<Profile>) {
    super()
    Object.assign(this, partial)
  }
}
