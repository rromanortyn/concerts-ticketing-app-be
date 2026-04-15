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
    // This returns duplicate rows from 'genres' because of the join
    // E.g., if an event has 3 genres, it will return 3 rows with the same event data
    // TODO: Find events and then, fetch genres using the 'IN' operator separately
    const events = await this.eventRepository.createQueryBuilder('event')
      .leftJoinAndSelect('event.image', 'image')
      .innerJoinAndSelect('event.genres', 'genres')
      .select([
        'event.id',
        'event.title',
        'event.description',
        'event.startDate',
        'event.endDate',
        'image.key',
        'genres.name',
      ])
      .getMany()

    return {
      data: events,
    }
  }
}

export default GetEventsQueryHandler
