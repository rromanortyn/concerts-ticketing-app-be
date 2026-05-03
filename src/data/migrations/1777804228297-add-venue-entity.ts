import { MigrationInterface, QueryRunner } from 'typeorm'

class AddVenueEntity1777804228297 implements MigrationInterface {
  name = 'AddVenueEntity1777804228297'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
			CREATE TABLE "venues" (
				"id" SERIAL NOT NULL, 
				"createdAt" TIMESTAMP NOT NULL DEFAULT now(), 
				"updatedAt" TIMESTAMP NOT NULL DEFAULT now(), 
				"name" character varying NOT NULL, 
				"cityId" integer, 
				CONSTRAINT "PK_cb0f885278d12384eb7a81818be" PRIMARY KEY ("id")
			)
		`)
    await queryRunner.query(`
			ALTER TABLE "venues" 
			ADD CONSTRAINT "FK_dff93f57c684c920ca09175d1ad" 
			FOREIGN KEY ("cityId") REFERENCES "cities"("id") 
			ON DELETE NO ACTION 
			ON UPDATE NO ACTION
		`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
			ALTER TABLE "venues" 
			DROP CONSTRAINT "FK_dff93f57c684c920ca09175d1ad"
		`)
    await queryRunner.query(`DROP TABLE "venues"`)
  }
}

export default AddVenueEntity1777804228297
