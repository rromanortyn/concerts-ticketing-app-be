import { Controller, Get } from '@nestjs/common'
import { QueryBus } from '@nestjs/cqrs'
import { plainToInstance } from 'class-transformer'

import GetGenresQuery from '../cqrs/queries/get-genres.query'
import GetGenresItemResponseDto from '../dto/response/get-genres.response-dto'

@Controller()
class GenreController {
  constructor(
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  async getGenres(): Promise<GetGenresItemResponseDto[]> {
    const { data } = await this.queryBus.execute(
      new GetGenresQuery({}),
    )
    
    return plainToInstance(
      GetGenresItemResponseDto, 
      data,
      { excludeExtraneousValues: true },
    )
  }
}

export default GenreController
