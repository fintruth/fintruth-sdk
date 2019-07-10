import { BaseAddress } from '@fintruth-sdk/common'
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

import AddressType from './address-type'

@Entity()
@ObjectType()
export default class Address extends BaseEntity implements BaseAddress {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Field()
  @Column()
  city: string

  @Field()
  @Column()
  country: string

  @Field()
  @Column()
  line1: string

  @Field()
  @Column({ default: '' })
  line2: string

  @Field()
  @Column()
  postalCode: string

  @Field()
  @Column()
  subdivision: string

  @Field(() => AddressType)
  @ManyToOne(() => AddressType, ({ addresses }) => addresses, { eager: true })
  type: AddressType

  @Field(() => ID)
  @Column()
  typeId: string

  @Field(() => Date)
  @CreateDateColumn()
  createdAt: Date

  @Field(() => Date)
  @UpdateDateColumn()
  updatedAt: Date

  constructor(partialAddress: Partial<Address> = {}) {
    super()

    Object.assign(this, partialAddress)
  }
}
