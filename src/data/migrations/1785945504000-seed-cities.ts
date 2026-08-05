import { MigrationInterface, QueryRunner } from 'typeorm'

import CityEntity from '../entities/city.entity'
import citiesSeed from '../seeds/cities.seed'

class SeedCities1785945504000 implements MigrationInterface {
  name = 'SeedCities1785945504000'

  public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.manager
			.createQueryBuilder()
			.insert()
			.into(CityEntity)
			.values(citiesSeed)
			.orIgnore()
			.execute()
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.manager
			.createQueryBuilder()
			.delete()
			.from(CityEntity)
			.where(
				'slug IN (:...slugs)',
				{ slugs: citiesSeed.map((city) => city.slug) },
			)
			.execute()
  }
}

export default SeedCities1785945504000
