import { NotFoundException } from '@nestjs/common'
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'

import EventEntity from 'src/data/entities/event.entity'
import GetEventByIdQuery from '../queries/get-event-by-id.query'
import GetEventByIdQueryOutput from 'src/modules/event/types/classes/query-outputs/get-event-by-id.query-output'

@QueryHandler(GetEventByIdQuery)
class GetEventByIdQueryHandler implements IQueryHandler<GetEventByIdQuery> {
  constructor(
    @InjectRepository(EventEntity)
    private readonly eventRepository: Repository<EventEntity>,
  ) {}

  async execute(query: GetEventByIdQuery): Promise<GetEventByIdQueryOutput> {
    const { id } = query.input
    
    const event = await this.eventRepository.findOne({
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
      where: {
        id,
      },
    })

    if (!event) {
      throw new NotFoundException({
        code: 'EVENT_NOT_FOUND',
        message: 'An event with the specified id does not exist',
      })
    }

    return {
      data: event,
    }
  }
}

export default GetEventByIdQueryHandler
