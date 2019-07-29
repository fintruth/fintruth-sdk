import { BaseProfile } from '@fintruth-sdk/common'
import { Field, ID, ObjectType } from 'type-graphql'
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

import User from './user'

@Entity()
@ObjectType()
export default class Profile extends BaseEntity implements BaseProfile {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Field()
  @Column()
  familyName: string

  @Field()
  @Column()
  givenName: string

  @OneToOne(() => User, ({ profile }) => profile, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User

  @Field(() => ID)
  @Column()
  userId: string

  @Field(() => Date)
  @CreateDateColumn()
  createdAt: Date

  @Field(() => Date)
  @UpdateDateColumn()
  updatedAt: Date

  constructor(partialProfile: Partial<Profile> = {}) {
    super()

    Object.assign(this, partialProfile)
  }
}
