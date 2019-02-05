import { User as UserEntity } from '@fintruth-sdk/shared'
import { compareSync } from 'bcrypt'
import { Field, ID, ObjectType } from 'type-graphql'
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import Profile from './profile'

@ObjectType()
@Entity()
export default class User implements UserEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Field()
  @Column({ unique: true })
  email: string

  @Column()
  password: string

  @OneToOne(() => Profile, ({ user }) => user, { cascade: true })
  profile!: Profile

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
