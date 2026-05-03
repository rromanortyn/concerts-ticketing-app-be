import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import CityController from './controllers/city.controller'
import CityEntity from 'src/data/entities/city.entity'
import AddCityCommandHandler from './cqrs/command-handlers/add-city.command-handler'

@Module({
  imports: [TypeOrmModule.forFeature([CityEntity])],
  controllers: [CityController],
  providers: [AddCityCommandHandler],
})
class CityModule {}

export default CityModule
