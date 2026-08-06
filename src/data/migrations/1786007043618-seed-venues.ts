import { MigrationInterface, QueryRunner } from 'typeorm'

import venuesSeed from '../seeds/venues.seed'
import VenueEntity from '../entities/venue.entity'
import CityEntity from '../entities/city.entity'

class SeedVenues1786007043618 implements MigrationInterface {
  name = 'SeedVenues1786007043618'

  public async up(queryRunner: QueryRunner): Promise<void> {
		const citiesSlugs = new Set(venuesSeed.map((venue) => venue.citySlug))

		const cities = await queryRunner.manager
			.getRepository(CityEntity)
			.createQueryBuilder('city')
			.select([
				'city.id',
				'city.slug',
			])
			.where('city.slug IN (:...slugs)', { slugs: Array.from(citiesSlugs) })
			.getMany()

		const venuesToInsert = venuesSeed.map((venue) => ({
			city: cities.find((city) => city.slug === venue.citySlug),
			name: venue.name,
		}))

		console.log('venuesToInsert', venuesToInsert)

		await queryRunner.manager
			.getRepository(VenueEntity)
			.createQueryBuilder()
			.insert()
			.values(venuesToInsert)
			.orIgnore()
			.execute()
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
		const citiesSlugs = new Set(venuesSeed.map((venue) => venue.citySlug))

		const cities = await queryRunner.manager
			.getRepository(CityEntity)
			.createQueryBuilder('city')
			.select([
				'city.id',
				'city.slug',
			])
			.where('city.slug IN (:...slugs)', { slugs: Array.from(citiesSlugs) })
			.getMany()

		const venuesWithCityIds = venuesSeed.map((venue) => ({
			cityId: cities.find((city) => city.slug === venue.citySlug)?.id,
			name: venue.name,
		}))

		await queryRunner.manager
			.getRepository(VenueEntity)
			.createQueryBuilder()
			.delete()
			.where(
				'(cityId, name) IN (:...venues)',
				{ venues: venuesWithCityIds.map((venue) => [venue.cityId, venue.name]) },
			)
			.execute()
  }
}

export default SeedVenues1786007043618
