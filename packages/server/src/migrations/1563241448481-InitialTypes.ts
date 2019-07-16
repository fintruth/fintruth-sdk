import { AddressType, MediaType, PhoneType } from '@fintruth-sdk/common'
import { MigrationInterface, QueryRunner } from 'typeorm'

const addressTypes: AddressType[] = [
  { id: '3bc72072-4446-41c6-a5d3-ad1caec32bb7', name: 'home' },
  { id: '3e1ab6a4-2bbb-4a52-9797-58d7262ddf6b', name: 'work' },
]

const mediaTypes: MediaType[] = [
  { id: '3538b77c-2174-41ed-a69a-54ad04010cf1', name: 'document' },
  { id: 'ea6c9c33-81af-4229-bdbe-5cad6c712398', name: 'image' },
  { id: '6f1caf05-258d-4731-91f0-49d3d662dec8', name: 'pdf' },
]

const phoneTypes: PhoneType[] = [
  { id: 'd03e25fc-b930-4fbf-8dba-966e70410fee', name: 'fax' },
  { id: '767f4a2f-5c8e-40b0-a332-6fe8e49d6312', name: 'home' },
  { id: '4aff7b3f-e8f0-467c-b26d-18f7fde2cda3', name: 'mobile' },
  { id: '061e1694-c2eb-466a-a066-c40ddb492587', name: 'work' },
]

export class InitialTypes1562784739127 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('address_type')
      .values(addressTypes)
      .execute()

    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('media_type')
      .values(mediaTypes)
      .execute()

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

    await queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('media_type')
      .whereInIds(mediaTypes)
      .execute()

    await queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('address_type')
      .whereInIds(addressTypes)
      .execute()
  }
}
