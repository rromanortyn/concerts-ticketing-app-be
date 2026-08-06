import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'

import VenueEntity from 'src/data/entities/venue.entity'
import GetAllVenuesQuery from '../queries/get-all-venues.query'
import GetAllVenuesQueryOutput from '../../types/classes/query-outputs/get-all-venues.query-output'

@QueryHandler(GetAllVenuesQuery)
class GetAllVenuesQueryHandler implements IQueryHandler<GetAllVenuesQuery> {
  constructor(
    @InjectRepository(VenueEntity)
    private readonly venueRepository: Repository<VenueEntity>,
  ) {}

  async execute(query: GetAllVenuesQuery): Promise<GetAllVenuesQueryOutput> {
    const { cityId } = query.input

    const venues = await this.venueRepository.createQueryBuilder('venue')
      .select([
        'venue.id',
        'venue.name',
      ])
      .where('venue.cityId = :cityId', { cityId })
      .getMany()

    return {
      data: venues,
    }
  }
}

export default GetAllVenuesQueryHandler
