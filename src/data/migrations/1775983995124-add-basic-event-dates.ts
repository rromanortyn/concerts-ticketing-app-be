import { MigrationInterface, QueryRunner } from 'typeorm'

class AddBasicEventDates1775983995124 implements MigrationInterface {
  name = 'AddBasicEventDates1775983995124'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
			ALTER TABLE "events"
			ADD "startDate" TIMESTAMP WITH TIME ZONE NOT NULL
		`)
    await queryRunner.query(`
			ALTER TABLE "events"
			ADD "endDate" TIMESTAMP WITH TIME ZONE NOT NULL
		`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "events" DROP COLUMN "endDate"`)
    await queryRunner.query(`ALTER TABLE "events" DROP COLUMN "startDate"`)
  }
}

export default AddBasicEventDates1775983995124
