import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import EventController from './controllers/event.controller'
import AddEventCommandHandler from './cqrs/command-handlers/add-event.command-handler'
import EventEntity from 'src/data/entities/event.entity'
import GetEventsQueryHandler from './cqrs/query-handlers/get-events.query-handler'
import GetEventByIdQueryHandler from './cqrs/query-handlers/get-event-by-id.query-handler'
import GetPopularEventsQueryHandler from './cqrs/query-handlers/get-popular-events.query-handler'
import FileEntity from 'src/data/entities/file.entity'
import GenreEntity from 'src/data/entities/genre.entity'
import EventGenreEntity from 'src/data/entities/event-genre.entity'
import VenueEntity from 'src/data/entities/venue.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      EventEntity,
      GenreEntity,
      EventGenreEntity,
      FileEntity,
      VenueEntity,
    ]),
  ],
  controllers: [
    EventController,
  ],
  providers: [
    AddEventCommandHandler,
    GetEventsQueryHandler,
    GetPopularEventsQueryHandler,
    GetEventByIdQueryHandler,
  ],
})
class EventModule {}

export default EventModule
