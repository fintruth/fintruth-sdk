import { User as UserEntity } from '@fintruth-sdk/shared'
import { compareSync } from 'bcrypt'
import { Field, ID, ObjectType } from 'type-graphql'
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'

@ObjectType()
@Entity()
export class User implements UserEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Field()
  @Column({ unique: true })
  email: string

  @Column()
  password: string

  @Column({ nullable: true })
  secret?: string

  @Column({ nullable: true })
  secretTemp?: string

  @Field()
  @CreateDateColumn()
  createdAt: Date

  @Field()
  @UpdateDateColumn()
  updatedAt: Date

  validatePassword(password: string) {
    return compareSync(password, this.password)
  }
}
