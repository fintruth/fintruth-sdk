import { PhoneType } from '@fintruth-sdk/common'
import { MigrationInterface, QueryRunner } from 'typeorm'

const phoneTypes: PhoneType[] = [
  { id: 'd03e25fc-b930-4fbf-8dba-966e70410fee', name: 'fax' },
  { id: '767f4a2f-5c8e-40b0-a332-6fe8e49d6312', name: 'home' },
  { id: '4aff7b3f-e8f0-467c-b26d-18f7fde2cda3', name: 'mobile' },
  { id: '061e1694-c2eb-466a-a066-c40ddb492587', name: 'work' },
]

export class PhoneType1562785197068 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('phone_type')
      .values(phoneTypes)
      .execute()
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('phone_type')
      .whereInIds(phoneTypes)
      .execute()
  }
}
