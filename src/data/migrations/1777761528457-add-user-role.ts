import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddUserRole1777761528457 implements MigrationInterface {
  name = 'AddUserRole1777761528457'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
			CREATE TYPE "public"."users_role_enum" AS ENUM('attendee', 'admin')
		`)
    await queryRunner.query(`
			ALTER TABLE "users"
			ADD "role" "public"."users_role_enum" NOT NULL
		`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
			ALTER TABLE "users"
			DROP COLUMN "role"
		`)
    await queryRunner.query(`DROP TYPE "public"."users_role_enum"`)
  }
}

export default AddUserRole1777761528457
