import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import EventController from './controllers/event.controller'
import AddEventCommandHandler from './cqrs/command-handlers/add-event.command-handler'
import EventEntity from 'src/data/entities/event.entity'
import GetEventsQueryHandler from './cqrs/query-handlers/get-events.query-handler'
import GetEventByIdQueryHandler from './cqrs/query-handlers/get-event-by-id.query-handler'
import FileEntity from 'src/data/entities/file.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      EventEntity,
      FileEntity,
    ]),
  ],
  controllers: [
    EventController,
  ],
  providers: [
    AddEventCommandHandler,
    GetEventsQueryHandler,
    GetEventByIdQueryHandler,
  ],
})
class EventModule {}

export default EventModule
