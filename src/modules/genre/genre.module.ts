import { Module } from '@nestjs/common'

import { TypeOrmModule } from '@nestjs/typeorm'

import GenreController from './controllers/genre.controller'
import GenreEntity from 'src/data/entities/genre.entity'
import GetGenresQueryHandler from './cqrs/query-handlers/get-genres.query-handler'

@Module({
  imports: [
    TypeOrmModule.forFeature([GenreEntity]),
  ],
  controllers: [GenreController],
  providers: [
    GetGenresQueryHandler,
  ],
})
class GenreModule {}

export default GenreModule
