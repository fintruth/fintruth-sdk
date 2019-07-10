import { BaseEmail } from '@fintruth-sdk/common'
import { Field, ID, ObjectType } from 'type-graphql'
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity()
@ObjectType()
export default class Email extends BaseEntity implements BaseEmail {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Field()
  @Column({ default: false })
  isVerified: boolean

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
}
