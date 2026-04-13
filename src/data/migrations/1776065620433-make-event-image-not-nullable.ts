import { MigrationInterface, QueryRunner } from 'typeorm'

class MakeEventImageNotNullable1776065620433 implements MigrationInterface {
  name = 'MakeEventImageNotNullable1776065620433'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
			ALTER TABLE "events"
			DROP CONSTRAINT "FK_35515e57a42f4fd00a4172371bb"
		`)
    await queryRunner.query(`
			ALTER TABLE "events"
			ALTER COLUMN "imageId" SET NOT NULL
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
			ALTER COLUMN "imageId" DROP NOT NULL
		`)
    await queryRunner.query(`
			ALTER TABLE "events"
			ADD CONSTRAINT "FK_35515e57a42f4fd00a4172371bb"
				FOREIGN KEY ("imageId") REFERENCES "files"("id")
				ON DELETE NO ACTION
				ON UPDATE NO ACTION
		`)
  }
}

export default MakeEventImageNotNullable1776065620433
