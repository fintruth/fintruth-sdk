import { BasePhone } from '@fintruth-sdk/common'
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

import Country from './country'
import PhoneType from './phone-type'

@Entity()
@ObjectType()
export default class Phone extends BaseEntity implements BasePhone {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Field(() => Country)
  @ManyToOne(() => Country, ({ phones }) => phones)
  country: Country

  @Field(() => ID)
  @Column()
  countryId: string

  @Field()
  @Column({ default: '' })
  ext: string

  @Field()
  @Column({ default: false })
  isVerified: boolean

  @Field()
  @Column()
  number: string

  @Field(() => PhoneType)
  @ManyToOne(() => PhoneType, ({ phones }) => phones, { eager: true })
  type: PhoneType

  @Field(() => ID)
  @Column()
  typeId: string

  @Field(() => Date)
  @CreateDateColumn()
  createdAt: Date

  @Field(() => Date)
  @UpdateDateColumn()
  updatedAt: Date

  constructor(partialPhone: Partial<Phone> = {}) {
    super()

    Object.assign(this, partialPhone)
  }
}
