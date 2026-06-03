import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'

import CityEntity from 'src/data/entities/city.entity'
import GetCitiesQuery from '../queries/get-cities.query'
import GetCitiesQueryOutput from '../../types/classes/query-outputs/get-cities.query-output'

@QueryHandler(GetCitiesQuery)
class GetCitiesQueryHandler implements IQueryHandler<GetCitiesQuery> {
  constructor(
    @InjectRepository(CityEntity)
    private readonly cityRepository: Repository<CityEntity>,
  ) {}

  async execute(): Promise<GetCitiesQueryOutput> {
    const cities = await this.cityRepository
      .createQueryBuilder('city')
      .select(['city.id', 'city.name'])
      .getMany()

    return {
      data: cities,
    }
  }
}

export default GetCitiesQueryHandler
