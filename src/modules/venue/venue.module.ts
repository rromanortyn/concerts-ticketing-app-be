import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import VenueController from './controllers/venue.controller'
import VenueEntity from 'src/data/entities/venue.entity'
import AddVenueCommandHandler from './cqrs/command-handlers/add-venue.command-handler'
import CityEntity from 'src/data/entities/city.entity'
import EventEntity from 'src/data/entities/event.entity'
import GetVenuesQueryHandler from './cqrs/query-handlers/get-venues.query-handler'

@Module({
  imports: [TypeOrmModule.forFeature([VenueEntity, CityEntity, EventEntity])],
  controllers: [VenueController],
  providers: [AddVenueCommandHandler, GetVenuesQueryHandler],
})
class VenueModule {}

export default VenueModule
