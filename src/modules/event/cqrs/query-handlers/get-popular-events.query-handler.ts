import { Inject } from '@nestjs/common'
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { InjectRepository } from '@nestjs/typeorm'
import { In, Repository } from 'typeorm'

import EventEntity from 'src/data/entities/event.entity'
import GetEventsQueryOutput from '../../types/classes/query-outputs/get-events.query-output'
import GenreEntity from 'src/data/entities/genre.entity'
import EventGenreEntity from 'src/data/entities/event-genre.entity'
import GetPopularEventsQuery from '../queries/get-popular-events.query'
import uploadProviderNames from 'src/libs/upload/consts/provider-names'
import type UploadService from 'src/libs/upload/services/interfaces/upload.service'

@QueryHandler(GetPopularEventsQuery)
class GetPopularEventsQueryHandler implements IQueryHandler<GetPopularEventsQuery> {
  constructor(
    @InjectRepository(EventEntity)
    private readonly eventRepository: Repository<EventEntity>,
    @InjectRepository(GenreEntity)
    private readonly genreRepository: Repository<GenreEntity>,
    @InjectRepository(EventGenreEntity)
    private readonly eventGenreRepository: Repository<EventGenreEntity>,
    @Inject(uploadProviderNames.minioUploadService)
    private readonly uploadService: UploadService,
  ) {}

  async execute(query: GetPopularEventsQuery): Promise<GetEventsQueryOutput> {
    const { limit = 10, cityId } = query.input

    const eventsQueryBuilder = this.eventRepository.createQueryBuilder('event')
      .leftJoinAndSelect('event.image', 'image')
      .leftJoinAndSelect('event.city', 'city')
      .leftJoinAndSelect('event.venue', 'venue')
      .select([
        'event.id',
        'event.title',
        'event.description',
        'event.startDate',
        'event.endDate',
        'image.key',
        'city.name',
        'venue.name',
      ])

    if (cityId) {
      eventsQueryBuilder.andWhere('event.cityId = :cityId', { cityId })
    }

    const events = await eventsQueryBuilder
      .skip(0)
      .limit(limit)
      .getMany()
    
    const eventGenres = await this.eventGenreRepository.find({
      where: {
        eventId: In(events.map((event) => event.id)),
      },
      select: ['eventId', 'genreId'],
    })

    const genresIds = [...new Set(eventGenres.map((eventGenre) => eventGenre.genreId))]
    
    const genres = await this.genreRepository.find({
      where: {
        id: In(genresIds),
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
console.log(eventsWithGenres)
    const eventsWithImages = await Promise.all(
      eventsWithGenres.map(async (event) => ({
        ...event,
        image: {
          src: await this.uploadService.getPresignedUrl(event.image.key),
        },
      })),
    )

    return {
      data: {
        items: eventsWithImages,
        hasMore: false,
      },
    }
  }
}

export default GetPopularEventsQueryHandler
