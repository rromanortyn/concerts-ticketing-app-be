import { Inject } from '@nestjs/common'
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'

import EventEntity from 'src/data/entities/event.entity'
import VenueEntity from 'src/data/entities/venue.entity'
import GetVenuesQuery from '../queries/get-venues.query'
import GetVenuesQueryOutput from '../../types/classes/query-outputs/get-venues.query-output'
import uploadProviderNames from 'src/libs/upload/consts/provider-names'
import type UploadService from 'src/libs/upload/services/interfaces/upload.service'

const EVENT_LIMIT = 10
const VENUE_LIMIT = 5

@QueryHandler(GetVenuesQuery)
class GetVenuesQueryHandler implements IQueryHandler<GetVenuesQuery> {
  constructor(
    @InjectRepository(VenueEntity)
    private readonly venueRepository: Repository<VenueEntity>,
    @InjectRepository(EventEntity)
    private readonly eventRepository: Repository<EventEntity>,
    @Inject(uploadProviderNames.minioUploadService)
    private readonly uploadService: UploadService,
  ) {}

  async execute(query: GetVenuesQuery): Promise<GetVenuesQueryOutput> {
    const { cityId, limit = VENUE_LIMIT } = query.input
    const venueLimit = Math.min(limit, VENUE_LIMIT)

    const venuesQueryBuilder = this.venueRepository.createQueryBuilder('venue')
      .select([
        'venue.id',
        'venue.name',
      ])
      .take(venueLimit)

    if (cityId) {
      venuesQueryBuilder.andWhere('venue.cityId = :cityId', { cityId })
    }

    const venues = await venuesQueryBuilder.getMany()

    const items = await Promise.all(
      venues.map(async (venue) => {
        const events = await this.eventRepository.createQueryBuilder('event')
          .leftJoinAndSelect('event.image', 'image')
          .leftJoinAndSelect('event.genres', 'genre')
          .leftJoinAndSelect('event.city', 'city')
          .select([
            'event.id',
            'event.title',
            'event.description',
            'event.startDate',
            'event.endDate',
            'image.key',
            'genre.id',
            'genre.name',
            'city.id',
            'city.name',
          ])
          .where('event.venueId = :venueId', { venueId: venue.id })
          .take(EVENT_LIMIT)
          .getMany()

        const eventsWithImages = await Promise.all(
          events.map(async (event) => ({
            ...event,
            image: {
              src: await this.uploadService.getPresignedUrl(event.image.key),
            },
          })),
        )

        return {
          id: venue.id,
          name: venue.name,
          image: { src: '' },
          events: eventsWithImages,
        }
      }),
    )

    const filteredItems = items.filter((venue) => venue.events.length > 0)

    return {
      data: {
        items: filteredItems,
      },
    }
  }
}

export default GetVenuesQueryHandler
