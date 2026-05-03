import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { In, Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'

import EventEntity from 'src/data/entities/event.entity'
import GetEventsQuery from '../queries/get-events.query'
import GetEventsQueryOutput from '../../types/classes/query-outputs/get-events.query-output'
import GenreEntity from 'src/data/entities/genre.entity'
import EventGenreEntity from 'src/data/entities/event-genre.entity'

@QueryHandler(GetEventsQuery)
class GetEventsQueryHandler implements IQueryHandler<GetEventsQuery> {
  constructor(
    @InjectRepository(EventEntity)
    private readonly eventRepository: Repository<EventEntity>,
    @InjectRepository(GenreEntity)
    private readonly genreRepository: Repository<GenreEntity>,
    @InjectRepository(EventGenreEntity)
    private readonly eventGenreRepository: Repository<EventGenreEntity>,
  ) {}

  async execute(query: GetEventsQuery): Promise<GetEventsQueryOutput> {
    const events = await this.eventRepository.createQueryBuilder('event')
      .leftJoinAndSelect('event.image', 'image')
      .select([
        'event.id',
        'event.title',
        'event.description',
        'event.startDate',
        'event.endDate',
        'image.key',
      ])
      .limit(10)
      .getMany()

    const eventGenres = await this.eventGenreRepository.find({
      where: {
        eventId: In(events.map((event) => event.id)),
      },
      select: ['eventId', 'genreId'],
    })

    const genres = await this.genreRepository.find({
      where: {
        id: In(eventGenres.map((eventGenre) => eventGenre.genreId)),
      },
      // selecting id is required here because we need it to filter the genres
      select: ['id', 'name'],
    })

    const eventsIds = [...new Set(eventGenres.map((eventGenre) => eventGenre.eventId))]

    const eventsWithGenres = eventsIds
      .map((eventId) => ({
        // find the event by id
        ...events.find((event) => event.id === eventId)!,
        genres: eventGenres
          // find the genres for this event
          .filter((eventGenre) => eventGenre.eventId === eventId)
          // find the genre entity for each genre id
          .map((eventGenre) => genres.find((genre) => genre.id === eventGenre.genreId)!),
      }))

    return {
      data: {
        items: eventsWithGenres,
        hasMore: true,
      },
    }
  }
}

export default GetEventsQueryHandler
