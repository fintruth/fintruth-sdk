import { BaseEntity as IBaseEntity } from '@fintruth-sdk/common'
import moment from 'moment'
import { Field, ID, ObjectType } from 'type-graphql'
import {
  BaseEntity as TypeOrmBaseEntity,
  ColumnOptions,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

const dateColumnOptions: ColumnOptions = {
  transformer: {
    to: (str?: string) => (!str ? str : moment(str).toDate()),
    from: (date?: Date) => (!date ? date : moment(date).format()),
  },
  type: 'timestamptz',
}

@ObjectType()
export default abstract class BaseEntity extends TypeOrmBaseEntity
  implements IBaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Field()
  @CreateDateColumn(dateColumnOptions)
  createdAt: string

  @Field()
  @UpdateDateColumn(dateColumnOptions)
  updatedAt: string
}
