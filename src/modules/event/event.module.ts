import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import EventController from './controllers/event.controller'
import AddEventCommandHandler from './cqrs/command-handlers/add-event.command-handler'
import EventEntity from 'src/data/entities/event.entity'
import GetEventsQueryHandler from './cqrs/query-handlers/get-events.query-handler'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      EventEntity,
    ]),
  ],
  controllers: [
    EventController,
  ],
  providers: [
    AddEventCommandHandler,
    GetEventsQueryHandler,
  ],
})
class EventModule {}

export default EventModule
