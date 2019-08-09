import { Address as IAddress } from '@fintruth-sdk/common'
import { Field, ID, ObjectType } from 'type-graphql'
import { Column, Entity, ManyToOne } from 'typeorm'

import AddressType from './address-type'
import BaseEntity from './base-entity'

@Entity()
@ObjectType()
export default class Address extends BaseEntity implements IAddress {
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
  @ManyToOne(() => AddressType, ({ addresses }) => addresses)
  type: AddressType

  @Field(() => ID)
  @Column()
  typeId: string

  constructor(partialAddress: Partial<Address> = {}) {
    super()

    Object.assign(this, partialAddress)
  }
}
