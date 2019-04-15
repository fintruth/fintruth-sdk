import { User as UserEntity } from '@fintruth-sdk/shared'
import { compareSync } from 'bcrypt'
import { isNil } from 'ramda'
import { Field, ID, ObjectType } from 'type-graphql'
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

import Profile from './profile'

@ObjectType()
@Entity()
export default class User implements UserEntity {
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

  @OneToOne(() => Profile, ({ user }) => user, { cascade: true })
  profile: Profile

  @Column({ nullable: true })
  secret?: string

  @Column({ nullable: true })
  secretTemp?: string

  @Field()
  @CreateDateColumn()
  createdAt: Date

  @Field()
  @UpdateDateColumn()
  updatedAt: Date

  @Field()
  get isTwoFactorAuthEnabled(): boolean {
    return !isNil(this.secret)
  }

  validatePassword(password: string) {
    return compareSync(password, this.password)
  }
}
