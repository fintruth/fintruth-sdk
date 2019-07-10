import { AddressType } from '@fintruth-sdk/common'
import { MigrationInterface, QueryRunner } from 'typeorm'

const addressTypes: AddressType[] = [
  { id: '3bc72072-4446-41c6-a5d3-ad1caec32bb7', name: 'home' },
  { id: '3e1ab6a4-2bbb-4a52-9797-58d7262ddf6b', name: 'work' },
]

export class AddressType1562784739127 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('address_type')
      .values(addressTypes)
      .execute()
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('address_type')
      .whereInIds(addressTypes)
      .execute()
  }
}
