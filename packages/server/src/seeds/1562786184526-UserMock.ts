import { BaseProfile, BaseUser } from '@fintruth-sdk/common'
import { hashSync } from 'bcrypt'
import { MigrationInterface, QueryRunner } from 'typeorm'

const profile: BaseProfile = {
  userId: '496ca0bf-470b-479a-b56d-f17c063003b1',
  familyName: 'User',
  givenName: 'Demo',
}

const user: Partial<BaseUser> & { password: string } = {
  id: '496ca0bf-470b-479a-b56d-f17c063003b1',
  email: 'demo@fintruth.com',
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
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('profile')
      .where('userId = :userId', profile)
      .execute()

    await queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('user')
      .where('id = :id', user)
      .execute()
  }
}
