import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import VenueController from './controllers/venue.controller'
import VenueEntity from 'src/data/entities/venue.entity'
import AddVenueCommandHandler from './cqrs/command-handlers/add-venue.command-handler'
import CityEntity from 'src/data/entities/city.entity'

@Module({
  imports: [TypeOrmModule.forFeature([VenueEntity, CityEntity])],
  controllers: [VenueController],
  providers: [AddVenueCommandHandler],
})
class VenueModule {}

export default VenueModule
