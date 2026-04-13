import { Expose, Type } from 'class-transformer'

class EventImageResponseDto {
  @Expose()
  key: string
}

class AddEventResponseDto {
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

export default AddEventResponseDto
