import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import MeController from './controllers/me.controller'
import GetMeQueryHandler from './cqrs/query-handlers/get-me.query-handler'
import UserEntity from 'src/data/entities/user.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
  ],
  controllers: [MeController],
  providers: [
    GetMeQueryHandler,
  ],
})
class MeModule {}

export default MeModule
