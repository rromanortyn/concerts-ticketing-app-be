import { Expose, Type } from 'class-transformer'

class EventImageResponseDto {
  @Expose()
  key: string
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
}

export default GetEventByIdResponseDto
