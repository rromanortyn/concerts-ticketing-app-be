import { MigrationInterface, QueryRunner } from 'typeorm'

class AddCityEntity1777759804533 implements MigrationInterface {
  name = 'AddCityEntity1777759804533'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
			CREATE TABLE "cities" (
				"id" SERIAL NOT NULL, 
				"createdAt" TIMESTAMP NOT NULL DEFAULT now(), 
				"updatedAt" TIMESTAMP NOT NULL DEFAULT now(), 
				"name" character varying NOT NULL, 
				CONSTRAINT "PK_4762ffb6e5d198cfec5606bc11e" PRIMARY KEY ("id")
			)
		`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "cities"`)
  }
}

export default AddCityEntity1777759804533
