import { MigrationInterface, QueryRunner } from 'typeorm'

class AddEventGenresManyToMany1776244200074 implements MigrationInterface {
	name = 'AddEventGenresManyToMany1776244200074'

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
			CREATE TABLE "event-genres" (
				"eventId" integer NOT NULL,
				"genreId" integer NOT NULL,
				CONSTRAINT "PK_9c9a9670996d4774fe754b90b20" PRIMARY KEY ("eventId", "genreId")
			)
		`)
		await queryRunner.query(`
			CREATE INDEX "IDX_ee337ce855f9feed77714475c3"
				ON "event-genres" ("eventId")
		`)
		await queryRunner.query(`
			CREATE INDEX "IDX_8b3204b1773c01cfc50c5273bd"
				ON "event-genres" ("genreId")
		`)
		await queryRunner.query(`
			ALTER TABLE "event-genres"
				ADD CONSTRAINT "FK_ee337ce855f9feed77714475c35"
				FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE CASCADE
		`)
		await queryRunner.query(`
			ALTER TABLE "event-genres"
				ADD CONSTRAINT "FK_8b3204b1773c01cfc50c5273bd7"
				FOREIGN KEY ("genreId") REFERENCES "genres"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
		`)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
			ALTER TABLE "event-genres"
				DROP CONSTRAINT "FK_8b3204b1773c01cfc50c5273bd7"
		`)
		await queryRunner.query(`
			ALTER TABLE "event-genres"
				DROP CONSTRAINT "FK_ee337ce855f9feed77714475c35"
		`)
		await queryRunner.query(`
			DROP INDEX "public"."IDX_8b3204b1773c01cfc50c5273bd"
		`)
		await queryRunner.query(`
			DROP INDEX "public"."IDX_ee337ce855f9feed77714475c3"
		`)
		await queryRunner.query(`DROP TABLE "event-genres"`)
	}
}

export default AddEventGenresManyToMany1776244200074
