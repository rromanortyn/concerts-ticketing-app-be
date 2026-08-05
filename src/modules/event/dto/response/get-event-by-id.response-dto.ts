import { Expose, Type } from 'class-transformer'

class EventImageResponseDto {
  @Expose()
  src!: string
}

class EventGenreResponseDto {
  @Expose()
  name!: string
}

class EventCityResponseDto {
  @Expose()
  name!: string
}

class EventVenueResponseDto {
  @Expose()
  id!: number

  @Expose()
  name!: string
}

class GetEventByIdResponseDto {
  @Expose()
  id!: number

  @Expose()
  title!: string

  @Expose()
  description!: string

  @Expose()
  startDate!: Date
  
  @Expose()
  endDate!: Date
  
  @Expose()
  @Type(() => EventImageResponseDto)
  image!: EventImageResponseDto
  
  @Expose()
  @Type(() => EventGenreResponseDto)
  genres!: EventGenreResponseDto[]

  @Expose()
  @Type(() => EventCityResponseDto)
  city!: EventCityResponseDto

  @Expose()
  @Type(() => EventVenueResponseDto)
  venue!: EventVenueResponseDto
}

export default GetEventByIdResponseDto
