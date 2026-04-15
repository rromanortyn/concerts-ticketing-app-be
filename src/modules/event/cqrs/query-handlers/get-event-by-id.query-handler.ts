import { NotFoundException } from '@nestjs/common'
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'

import EventEntity from 'src/data/entities/event.entity'
import GetEventByIdQuery from '../queries/get-event-by-id.query'
import GetEventByIdQueryOutput from 'src/modules/event/types/classes/query-outputs/get-event-by-id.query-output'
import ErrorCode from 'src/shared/types/enums/error-code.enum'

@QueryHandler(GetEventByIdQuery)
class GetEventByIdQueryHandler implements IQueryHandler<GetEventByIdQuery> {
  constructor(
    @InjectRepository(EventEntity)
    private readonly eventRepository: Repository<EventEntity>,
  ) {}

  async execute(query: GetEventByIdQuery): Promise<GetEventByIdQueryOutput> {
    const { id } = query.input

    const event = await this.eventRepository.createQueryBuilder('event')
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
      .where('event.id = :id', { id })
      .getOne()

    if (!event) {
      throw new NotFoundException({
        code: ErrorCode.EventNotFound,
        message: 'An event with the specified id does not exist',
      })
    }

    return {
      data: event,
    }
  }
}

export default GetEventByIdQueryHandler
