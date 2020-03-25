import { string } from '@fintruth-sdk/validation'
import { Email as IEmail } from '@fintruth-sdk/common'
import { Field, ID, ObjectType } from 'type-graphql'
import { Column, Entity, ManyToOne } from 'typeorm'

import BaseEntity from './base-entity'
import User from './user'

@Entity()
@ObjectType({ implements: BaseEntity })
export default class Email extends BaseEntity implements IEmail {
  @Field()
  @Column({ default: false })
  isPrimary: boolean

  @Field()
  @Column({ default: false })
  isVerified: boolean

  @ManyToOne(() => User, ({ emails }) => emails, { onDelete: 'CASCADE' })
  user: User

  @Field(() => ID)
  @Column()
  userId: string

  @Field()
  @Column({ unique: true })
  value: string

  constructor(partial: Partial<Email> = {}) {
    super()

    Object.assign(this, partial)
  }

  static async fromString(value: string) {
    await string().required().email().validate(value)

    return new Email({ value })
  }
}
