import { Country as ICountry } from '@fintruth-sdk/common'
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
export default class Country extends BaseEntity implements ICountry {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Field()
  @Column({ unique: true })
  alpha2Code: string

  @Field()
  @Column()
  callingCode: string

  @Field()
  @Column()
  name: string

  @OneToMany(() => Phone, ({ country }) => country)
  phones: Phone[]

  constructor(partialCountry: Partial<Country> = {}) {
    super()

    Object.assign(this, partialCountry)
  }
}
