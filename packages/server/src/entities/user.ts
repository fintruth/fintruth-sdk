import { User as IUser } from '@fintruth-sdk/common'
import { compareSync } from 'bcrypt'
import { Field, ObjectType } from 'type-graphql'
import { Column, Entity, OneToMany, OneToOne } from 'typeorm'

import BaseEntity from './base-entity'
import Email from './email'
import Profile from './profile'

@Entity()
@ObjectType({ implements: BaseEntity })
export default class User extends BaseEntity implements IUser {
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
