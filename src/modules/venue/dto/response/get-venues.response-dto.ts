import { Expose, Type } from 'class-transformer'

class VenueImageResponseDto {
  @Expose()
  src: string
}

class EventImageResponseDto {
  @Expose()
  src: string
}

class EventGenreResponseDto {
  @Expose()
  name: string
}

class EventCityResponseDto {
  @Expose()
  name: string
}

class EventResponseDto {
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

  @Expose()
  @Type(() => EventCityResponseDto)
  city: EventCityResponseDto
}

class GetVenuesItemResponseDto {
  @Expose()
  id: number

  @Expose()
  name: string

  @Expose()
  @Type(() => VenueImageResponseDto)
  image: VenueImageResponseDto

  @Expose()
  @Type(() => EventResponseDto)
  events: EventResponseDto[]
}

class GetVenuesResponseDto {
  @Expose()
  @Type(() => GetVenuesItemResponseDto)
  items: GetVenuesItemResponseDto[]
}

export default GetVenuesResponseDto
