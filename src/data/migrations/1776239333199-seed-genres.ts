import { MigrationInterface, QueryRunner } from 'typeorm'

import GenreEntity from '../entities/genre.entity'
import genresSeed from '../seeds/genres.seed'

class SeedGenres1776239333199 implements MigrationInterface {
	name = 'SeedGenres1776239333199'

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.manager
			.createQueryBuilder()
			.insert()
			.into(GenreEntity)
			.values(genresSeed)
			.orIgnore()
			.execute()
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.manager
			.createQueryBuilder()
			.delete()
			.from(GenreEntity)
			.where(
				'slug IN (:...slugs)',
				{ slugs: genresSeed.map((genre) => genre.slug) },
			)
			.execute()
	}
}

export default SeedGenres1776239333199
