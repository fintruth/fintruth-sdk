import { Email, Profile, User } from '@fintruth-sdk/common'
import { hashSync } from 'bcrypt'
import { MigrationInterface, QueryRunner } from 'typeorm'

const email: Partial<Email> = {
  id: '2bf22acd-ca93-425a-8912-20ad607c556b',
  isPrimary: true,
  isVerified: true,
  value: 'demo@fintruth.com',
  userId: '496ca0bf-470b-479a-b56d-f17c063003b1',
}

const profile: Partial<Profile> = {
  id: 'a1398ba1-bf84-41b6-ae7d-b6d51c3b32cf',
  familyName: 'User',
  givenName: 'Demo',
  userId: '496ca0bf-470b-479a-b56d-f17c063003b1',
}

const user: Partial<User> & { password: string } = {
  id: '496ca0bf-470b-479a-b56d-f17c063003b1',
  isAdmin: false,
  password: hashSync('A!s2d3f4g5', 10),
}

export class UserMock1562786184526 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('user')
      .values(user)
      .execute()

    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('profile')
      .values(profile)
      .execute()

    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('email')
      .values(email)
      .execute()
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('email')
      .where('id = :id', email)
      .execute()

    await queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('profile')
      .where('id = :id', profile)
      .execute()

    await queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('user')
      .where('id = :id', user)
      .execute()
  }
}
