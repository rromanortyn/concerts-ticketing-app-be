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
    const events = await this.eventRepository.find({
      select: {
        id: true,
        title: true,
        description: true,
        startDate: true,
        endDate: true,
        image: {
          key: true,
        },
      },
      relations: {
        image: true,
      },
    })

    return {
      data: events,
    }
  }
}

export default GetEventsQueryHandler
