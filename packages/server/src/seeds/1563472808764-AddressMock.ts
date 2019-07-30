import { BaseAddress } from '@fintruth-sdk/common'
import { MigrationInterface, QueryRunner } from 'typeorm'

const address: Partial<BaseAddress> = {
  id: '2b84ebdb-cbbc-4590-97bd-c0381c796783',
  city: 'Las Vegas',
  country: 'United States',
  line1: '8880 W Sunset Rd #250',
  postalCode: '89148',
  subdivision: 'Nevada',
  typeId: '3e1ab6a4-2bbb-4a52-9797-58d7262ddf6b',
}

export class AddressMock1563472808764 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('address')
      .values(address)
      .execute()
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('address')
      .where('id = :id', address)
      .execute()
  }
}
