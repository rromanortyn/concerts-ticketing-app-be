import { Expose, Type } from 'class-transformer'

class EventImageResponseDto {
  @Expose()
  key: string
}

class EventGenreResponseDto {
  @Expose()
  name: string
}

class GetEventByIdResponseDto {
  @Expose()
  id: number

  @Expose()
  title: string

  @Expose()
  description: string

  @Expose()
  startDate: Date
  
  @Expose()
  endDate: Date
  
  @Expose()
  @Type(() => EventImageResponseDto)
  image: EventImageResponseDto
  
  @Expose()
  @Type(() => EventGenreResponseDto)
  genres: EventGenreResponseDto[]
}

export default GetEventByIdResponseDto
