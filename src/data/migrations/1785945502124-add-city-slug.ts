import { MigrationInterface, QueryRunner } from 'typeorm'

class AddCitySlug1785945502124 implements MigrationInterface {
  name = 'AddCitySlug1785945502124'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "cities" ADD "slug" character varying NOT NULL`)
    await queryRunner.query(`ALTER TABLE "cities" ADD CONSTRAINT "UQ_8ef722e770798e37b3205370bfd" UNIQUE ("slug")`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "cities" DROP COLUMN "slug"`)
  }
}

export default AddCitySlug1785945502124
