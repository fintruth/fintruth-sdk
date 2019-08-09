import { BaseEntity as IBaseEntity } from '@fintruth-sdk/common'
import { parseISO } from 'date-fns'
import { Field, ID, InterfaceType } from 'type-graphql'
import {
  BaseEntity as TypeOrmBaseEntity,
  ColumnOptions,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

const dateColumnOptions: ColumnOptions = {
  transformer: {
    to: (str?: string) => (!str ? str : parseISO(str)),
    from: (date?: Date) => (!date ? date : date.toISOString()),
  },
  type: 'timestamptz',
}

@InterfaceType()
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
