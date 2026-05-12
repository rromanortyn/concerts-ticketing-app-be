import { MigrationInterface, QueryRunner } from 'typeorm'

class AddEventCity1778570810419 implements MigrationInterface {
  name = 'AddEventCity1778570810419'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "events" ADD "cityId" integer`)
    await queryRunner.query(`
			ALTER TABLE "events"
			ADD CONSTRAINT "FK_712790b5c3b1e6d859c0987c4f5"
			FOREIGN KEY ("cityId")
			REFERENCES "cities"("id")
			ON DELETE RESTRICT
			ON UPDATE NO ACTION
		`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
			ALTER TABLE "events"
			DROP CONSTRAINT "FK_712790b5c3b1e6d859c0987c4f5"
		`)
    await queryRunner.query(`ALTER TABLE "events" DROP COLUMN "cityId"`)
  }
}

export default AddEventCity1778570810419
