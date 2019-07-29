import { string } from '@fintruth-sdk/validation'
import { BaseEmail } from '@fintruth-sdk/common'
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

import User from './user'

@Entity()
@ObjectType()
export default class Email extends BaseEntity implements BaseEmail {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string

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

  @Field(() => Date)
  @CreateDateColumn()
  createdAt: Date

  @Field(() => Date)
  @UpdateDateColumn()
  updatedAt: Date

  constructor(partialEmail: Partial<Email> = {}) {
    super()

    Object.assign(this, partialEmail)
  }

  static async fromString(value: string) {
    await string()
      .required()
      .email()
      .validate(value)

    return new Email({ value })
  }
}
