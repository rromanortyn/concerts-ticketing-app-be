import { MigrationInterface, QueryRunner } from 'typeorm'

class AddUserEntity1767524262509 implements MigrationInterface {
  name = 'AddUserEntity1767524262509'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" (
        "id" SERIAL NOT NULL, 
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(), 
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), 
        "fullName" character varying NOT NULL, 
        "email" character varying NOT NULL, 
        "password" character varying, 
        CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), 
        CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
      )`
		)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`)
  }
}

export default AddUserEntity1767524262509
