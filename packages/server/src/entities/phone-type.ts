import { PhoneType as IPhoneType } from '@fintruth-sdk/common'
import { Field, ID, ObjectType } from 'type-graphql'
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'

import Phone from './phone'

@Entity()
@ObjectType()
export default class PhoneType extends BaseEntity implements IPhoneType {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Field()
  @Column()
  name: string

  @OneToMany(() => Phone, ({ type }) => type)
  phones: Phone[]

  constructor(partial: Partial<PhoneType> = {}) {
    super()

    Object.assign(this, partial)
  }
}
