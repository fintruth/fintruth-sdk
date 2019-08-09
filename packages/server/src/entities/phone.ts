import { Phone as IPhone } from '@fintruth-sdk/common'
import { Field, ID, ObjectType } from 'type-graphql'
import { Column, Entity, ManyToOne } from 'typeorm'

import BaseEntity from './base-entity'
import Country from './country'
import PhoneType from './phone-type'

@Entity()
@ObjectType({ implements: BaseEntity })
export default class Phone extends BaseEntity implements IPhone {
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

  constructor(partialPhone: Partial<Phone> = {}) {
    super()

    Object.assign(this, partialPhone)
  }
}
