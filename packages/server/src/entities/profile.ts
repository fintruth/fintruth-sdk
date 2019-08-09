import { Profile as IProfile } from '@fintruth-sdk/common'
import { Field, ID, ObjectType } from 'type-graphql'
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'

import BaseEntity from './base-entity'
import User from './user'

@Entity()
@ObjectType()
export default class Profile extends BaseEntity implements IProfile {
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

  constructor(partialProfile: Partial<Profile> = {}) {
    super()

    Object.assign(this, partialProfile)
  }
}
