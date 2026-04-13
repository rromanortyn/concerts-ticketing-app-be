import { MigrationInterface, QueryRunner } from 'typeorm'

class AddEventImage1776064997067 implements MigrationInterface {
  name = 'AddEventImage1776064997067'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
			CREATE TABLE "files" (
				"id" SERIAL NOT NULL,
				"createdAt" TIMESTAMP NOT NULL DEFAULT now(),
				"updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
				"originalName" character varying NOT NULL,
				"key" character varying NOT NULL,
				"mimeType" character varying NOT NULL,
				"size" bigint NOT NULL,
				CONSTRAINT "UQ_a5c218dfdf6ad6092fed2230a88" UNIQUE ("key"),
				CONSTRAINT "PK_6c16b9093a142e0e7613b04a3d9" PRIMARY KEY ("id")
			)
		`)
    await queryRunner.query(`
			ALTER TABLE "events"
			ADD "imageId" integer
		`)
    await queryRunner.query(`
			ALTER TABLE "events"
			ADD CONSTRAINT "UQ_35515e57a42f4fd00a4172371bb" UNIQUE ("imageId")
		`)
    await queryRunner.query(`
			ALTER TABLE "events"
			ADD CONSTRAINT "FK_35515e57a42f4fd00a4172371bb"
				FOREIGN KEY ("imageId") REFERENCES "files"("id")
				ON DELETE NO ACTION
				ON UPDATE NO ACTION
		`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
			ALTER TABLE "events"
			DROP CONSTRAINT "FK_35515e57a42f4fd00a4172371bb"
		`)
    await queryRunner.query(`
			ALTER TABLE "events"
			DROP CONSTRAINT "UQ_35515e57a42f4fd00a4172371bb"
		`)
    await queryRunner.query(`
			ALTER TABLE "events"
			DROP COLUMN "imageId"
		`)
    await queryRunner.query(`DROP TABLE "files"`)
  }
}

export default AddEventImage1776064997067
