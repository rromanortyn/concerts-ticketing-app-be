import { MigrationInterface, QueryRunner } from 'typeorm'

class MakeVenueNameUnique1786006591177 implements MigrationInterface {
	name = 'MakeVenueNameUnique1786006591177'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "venues" ADD CONSTRAINT "UQ_bb28c67fad9c46fac68d84a8aef" UNIQUE ("name")`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "venues" DROP CONSTRAINT "UQ_bb28c67fad9c46fac68d84a8aef"`)
  }
}

export default MakeVenueNameUnique1786006591177
