import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import EventController from './controllers/event.controller'
import AddEventCommandHandler from './cqrs/command-handlers/add-event.command-handler'
import EventEntity from 'src/data/entities/event.entity'

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
  ],
})
class EventModule {}

export default EventModule
