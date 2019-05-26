import { hashSync } from 'bcrypt'
import { MigrationInterface, QueryRunner } from 'typeorm'

export class User1556447639123 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('user')
      .values({
        id: '496ca0bf-470b-479a-b56d-f17c063003b1',
        email: 'demo@fintruth.com',
        isAdmin: false,
        password: hashSync('Asdfg!2345', 10),
      })
      .execute()

    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('profile')
      .values({
        userId: '496ca0bf-470b-479a-b56d-f17c063003b1',
        familyName: 'User',
        givenName: 'Demo',
      })
      .execute()
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('profile')
      .where('userId = :id', { id: '496ca0bf-470b-479a-b56d-f17c063003b1' })
      .execute()

    await queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('user')
      .where('id = :id', { id: '496ca0bf-470b-479a-b56d-f17c063003b1' })
      .execute()
  }
}
