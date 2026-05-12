import { MigrationInterface, QueryRunner } from 'typeorm'

class AddEventVenue1778492921430 implements MigrationInterface {
  name = 'AddEventVenue1778492921430'

  public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "events" ADD "venueId" integer`)
    await queryRunner.query(`
      ALTER TABLE "events"
      ADD CONSTRAINT "FK_0af7bb0535bc01f3c130cfe5fe7"
      FOREIGN KEY ("venueId")
      REFERENCES "venues"("id")
      ON DELETE RESTRICT
      ON UPDATE NO ACTION
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "events"
      DROP CONSTRAINT "FK_0af7bb0535bc01f3c130cfe5fe7"
    `)
    await queryRunner.query(`ALTER TABLE "events" DROP COLUMN "venueId"`)
  }
}

export default AddEventVenue1778492921430
