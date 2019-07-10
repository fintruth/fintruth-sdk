import { MediaType } from '@fintruth-sdk/common'
import { MigrationInterface, QueryRunner } from 'typeorm'

const mediaTypes: MediaType[] = [
  { id: '3538b77c-2174-41ed-a69a-54ad04010cf1', name: 'document' },
  { id: 'ea6c9c33-81af-4229-bdbe-5cad6c712398', name: 'image' },
  { id: '6f1caf05-258d-4731-91f0-49d3d662dec8', name: 'pdf' },
]

export class MediaType1562785186842 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('media_type')
      .values(mediaTypes)
      .execute()
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('media_type')
      .whereInIds(mediaTypes)
      .execute()
  }
}
