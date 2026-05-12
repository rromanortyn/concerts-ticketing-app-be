import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'

import EventEntity from 'src/data/entities/event.entity'
import GetEventsQuery from '../queries/get-events.query'
import GetEventsQueryOutput from '../../types/classes/query-outputs/get-events.query-output'

@QueryHandler(GetEventsQuery)
class GetEventsQueryHandler implements IQueryHandler<GetEventsQuery> {
  constructor(
    @InjectRepository(EventEntity)
    private readonly eventRepository: Repository<EventEntity>,
  ) {}

  async execute(query: GetEventsQuery): Promise<GetEventsQueryOutput> {
    const {
      skip,
      limit = 10,
      cityId,
      genresIds,
      dates,
    } = query.input

    const eventsQueryBuilder = this.eventRepository.createQueryBuilder('event')
      .innerJoin('event-genres', 'event-genres', 'event-genres.eventId = event.id')
      .leftJoinAndSelect('event.image', 'image')
      .leftJoinAndSelect('event.city', 'city')
      .leftJoinAndSelect('event.venue', 'venue')
      .select([
        'event.id',
        'event.title',
        'event.description',
        'event.startDate',
        'event.endDate',
        'image.id',
        'image.key',
        'city.id',
        'city.name',
        'venue.id',
        'venue.name',
      ])

    if (cityId) {
      eventsQueryBuilder.andWhere('event.cityId = :cityId', { cityId })
    }

    if (genresIds && genresIds.length > 0) {
      eventsQueryBuilder.andWhere('event-genres.genreId IN (:...genresIds)', { genresIds })
    }

    if (dates) {
      eventsQueryBuilder.andWhere('event.startDate >= :from', { from: dates.from })
      eventsQueryBuilder.andWhere('event.endDate <= :to', { to: dates.to })
    }

    const events = await eventsQueryBuilder
      .skip(skip)
      .take(limit)
      .getMany()

    return {
      data: {
        items: events,
        hasMore: true,
      },
    }
  }
}

export default GetEventsQueryHandler
