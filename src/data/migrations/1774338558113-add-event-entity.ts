import { MigrationInterface, QueryRunner } from 'typeorm'

class AddEventEntity1774338558113 implements MigrationInterface {
  name = 'AddEventEntity1774338558113'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
			CREATE TABLE "events" (
				"id" SERIAL NOT NULL,
				"createdAt" TIMESTAMP NOT NULL DEFAULT now(),
				"updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
				"title" character varying(50) NOT NULL,
				"description" character varying(200) NOT NULL,
				CONSTRAINT "PK_40731c7151fe4be3116e45ddf73" PRIMARY KEY ("id")
			)`
		)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "events"`)
  }
}

export default AddEventEntity1774338558113
