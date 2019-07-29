import { MigrationInterface, QueryRunner } from 'typeorm'

export class Initial1562784145322 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`CREATE TABLE IF NOT EXISTS "address_type" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "PK_7e192deb7cdcfa2b478be7d664f" PRIMARY KEY ("id"))`)
    await queryRunner.query(`CREATE TABLE IF NOT EXISTS "address" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "city" character varying NOT NULL, "country" character varying NOT NULL, "line1" character varying NOT NULL, "line2" character varying NOT NULL DEFAULT '', "postalCode" character varying NOT NULL, "subdivision" character varying NOT NULL, "typeId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`)
    await queryRunner.query(`CREATE TABLE IF NOT EXISTS "phone_type" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "PK_846a6d3d787b091783db67b0e4c" PRIMARY KEY ("id"))`)
    await queryRunner.query(`CREATE TABLE IF NOT EXISTS "phone" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "countryId" uuid NOT NULL, "ext" character varying NOT NULL DEFAULT '', "isVerified" boolean NOT NULL DEFAULT false, "number" character varying NOT NULL, "typeId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_f35e6ee6c1232ce6462505c2b25" PRIMARY KEY ("id"))`)
    await queryRunner.query(`CREATE TABLE IF NOT EXISTS "country" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "alpha2Code" character varying NOT NULL, "callingCode" character varying NOT NULL, "name" character varying NOT NULL, CONSTRAINT "UQ_18d3fb9cc4e96cd0685eadb5a02" UNIQUE ("alpha2Code"), CONSTRAINT "PK_bf6e37c231c4f4ea56dcd887269" PRIMARY KEY ("id"))`)
    await queryRunner.query(`CREATE TABLE IF NOT EXISTS "profile" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "familyName" character varying NOT NULL, "givenName" character varying NOT NULL, "userId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "REL_a24972ebd73b106250713dcddd" UNIQUE ("userId"), CONSTRAINT "PK_3dd8bfc97e4a77c70971591bdcb" PRIMARY KEY ("id"))`)
    await queryRunner.query(`CREATE TABLE IF NOT EXISTS "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "isAdmin" boolean NOT NULL DEFAULT false, "password" character varying NOT NULL, "secret" character varying, "secretTemp" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`)
    await queryRunner.query(`CREATE TABLE IF NOT EXISTS "email" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "isVerified" boolean NOT NULL DEFAULT false, "userId" uuid NOT NULL, "value" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_7c81dd76c75c30ad5713683ab2c" UNIQUE ("value"), CONSTRAINT "PK_1e7ed8734ee054ef18002e29b1c" PRIMARY KEY ("id"))`)
    await queryRunner.query(`CREATE TABLE IF NOT EXISTS "media_type" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "PK_42a5f58b69908435e57eac82216" PRIMARY KEY ("id"))`)
    await queryRunner.query(`CREATE TABLE IF NOT EXISTS "media" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "mimeType" character varying NOT NULL, "name" character varying NOT NULL, "path" character varying NOT NULL, "typeId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_f4e0fcac36e050de337b670d8bd" PRIMARY KEY ("id"))`)
    await queryRunner.query(`ALTER TABLE "address" ADD CONSTRAINT "FK_5664279bd41b77c5721f20843c7" FOREIGN KEY ("typeId") REFERENCES "address_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await queryRunner.query(`ALTER TABLE "phone" ADD CONSTRAINT "FK_1a14d582db627ec39a2b67f0b5a" FOREIGN KEY ("countryId") REFERENCES "country"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await queryRunner.query(`ALTER TABLE "phone" ADD CONSTRAINT "FK_d1b551e4f78b7283d6284c606fe" FOREIGN KEY ("typeId") REFERENCES "phone_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await queryRunner.query(`ALTER TABLE "profile" ADD CONSTRAINT "FK_a24972ebd73b106250713dcddd9" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`)
    await queryRunner.query(`ALTER TABLE "email" ADD CONSTRAINT "FK_13e97b4a1d6074fd75ea1bb844e" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`)
    await queryRunner.query(`ALTER TABLE "media" ADD CONSTRAINT "FK_cd6a404440a2cef68cc04d1c981" FOREIGN KEY ("typeId") REFERENCES "media_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`ALTER TABLE "media" DROP CONSTRAINT "FK_cd6a404440a2cef68cc04d1c981"`)
    await queryRunner.query(`ALTER TABLE "email" DROP CONSTRAINT "FK_13e97b4a1d6074fd75ea1bb844e"`)
    await queryRunner.query(`ALTER TABLE "profile" DROP CONSTRAINT "FK_a24972ebd73b106250713dcddd9"`)
    await queryRunner.query(`ALTER TABLE "phone" DROP CONSTRAINT "FK_d1b551e4f78b7283d6284c606fe"`)
    await queryRunner.query(`ALTER TABLE "phone" DROP CONSTRAINT "FK_1a14d582db627ec39a2b67f0b5a"`)
    await queryRunner.query(`ALTER TABLE "address" DROP CONSTRAINT "FK_5664279bd41b77c5721f20843c7"`)
    await queryRunner.query(`DROP TABLE "media"`)
    await queryRunner.query(`DROP TABLE "media_type"`)
    await queryRunner.query(`DROP TABLE "email"`)
    await queryRunner.query(`DROP TABLE "user"`)
    await queryRunner.query(`DROP TABLE "profile"`)
    await queryRunner.query(`DROP TABLE "country"`)
    await queryRunner.query(`DROP TABLE "phone"`)
    await queryRunner.query(`DROP TABLE "phone_type"`)
    await queryRunner.query(`DROP TABLE "address"`)
    await queryRunner.query(`DROP TABLE "address_type"`)
  }
}
