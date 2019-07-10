import { AddressType as BaseAddressType } from '@fintruth-sdk/common'
import { Field, ID, ObjectType } from 'type-graphql'
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'

import Address from './address'

@Entity()
@ObjectType()
export default class AddressType extends BaseEntity implements BaseAddressType {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string

  @OneToMany(() => Address, ({ type }) => type)
  addresses: Address[]

  @Field()
  @Column()
  name: string

  constructor(partialAddressType: Partial<AddressType> = {}) {
    super()

    Object.assign(this, partialAddressType)
  }
}
