import { Module } from '@nestjs/common'

import CityController from './controllers/city.controller'

@Module({
  controllers: [CityController],
})
class CityModule {}

export default CityModule
