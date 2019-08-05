import { BaseUser } from '@fintruth-sdk/common'
import { compareSync } from 'bcrypt'
import { Field, ID, ObjectType } from 'type-graphql'
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

import Email from './email'
import Profile from './profile'

@Entity()
@ObjectType()
export default class User extends BaseEntity implements BaseUser {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Field(() => [Email])
  @OneToMany(() => Email, ({ user }) => user, { cascade: true })
  emails: Email[]

  @Field()
  @Column({ default: false })
  isAdmin: boolean

  @Column()
  password: string

  @Field(() => Profile)
  @OneToOne(() => Profile, ({ user }) => user, { cascade: true })
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

  constructor(partial: Partial<User> = {}) {
    super()

    Object.assign(this, partial)
  }

  @Field()
  get isTwoFactorAuthEnabled(): boolean {
    return this.secret != null
  }

  validatePassword(password: string) {
    return compareSync(password, this.password)
  }
}
