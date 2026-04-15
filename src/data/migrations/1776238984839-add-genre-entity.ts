import { MigrationInterface, QueryRunner } from 'typeorm'

class AddGenreEntity1776238984839 implements MigrationInterface {
	name = 'AddGenreEntity1776238984839'

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
			CREATE TABLE "genres" (
				"id" SERIAL NOT NULL, 
				"createdAt" TIMESTAMP NOT NULL DEFAULT now(), 
				"updatedAt" TIMESTAMP NOT NULL DEFAULT now(), 
				"name" character varying NOT NULL, 
				"slug" character varying NOT NULL, 
				CONSTRAINT "UQ_d1cbe4fe39bdfc77c76e94eada5" UNIQUE ("slug"), 
				CONSTRAINT "PK_80ecd718f0f00dde5d77a9be842" PRIMARY KEY ("id")
			)
		`)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP TABLE "genres"`)
	}
}

export default AddGenreEntity1776238984839
