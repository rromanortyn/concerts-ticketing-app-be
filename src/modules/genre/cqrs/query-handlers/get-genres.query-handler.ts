import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'

import GetGenresQuery from '../queries/get-genres.query'
import GetGenresQueryOutput from '../../types/classes/query-outputs/get-genres.query-output'
import GenreEntity from 'src/data/entities/genre.entity'

@QueryHandler(GetGenresQuery)
class GetGenresQueryHandler implements IQueryHandler<GetGenresQuery> {
  constructor(
    @InjectRepository(GenreEntity)
    private readonly genreRepository: Repository<GenreEntity>,
  ) {}

  async execute(query: GetGenresQuery): Promise<GetGenresQueryOutput> {
    const genres = await this.genreRepository.find({
      select: ['id', 'name', 'slug'],
    })
    
    return {
      data: genres,
    }
  }
}

export default GetGenresQueryHandler
