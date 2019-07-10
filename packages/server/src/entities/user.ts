import { BaseUser } from '@fintruth-sdk/common'
import { compareSync } from 'bcrypt'
import { Field, ID, ObjectType } from 'type-graphql'
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

import Profile from './profile'

@Entity()
@ObjectType()
export default class User extends BaseEntity implements BaseUser {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Field()
  @Column({ unique: true })
  email: string

  @Field()
  @Column({ default: false })
  isAdmin: boolean

  @Column()
  password: string

  @OneToOne(() => Profile, ({ user }) => user, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  profile: Profile

  @Column({ nullable: true })
  secret?: string

  @Column({ nullable: true })
  secretTemp?: string

  @Field(() => Date)
  @CreateDateColumn()
  createdAt: Date

  @Field(() => Date)
  @UpdateDateColumn()
  updatedAt: Date

  @Field()
  get isTwoFactorAuthEnabled(): boolean {
    return this.secret != null
  }

  validatePassword(password: string) {
    return compareSync(password, this.password)
  }
}
