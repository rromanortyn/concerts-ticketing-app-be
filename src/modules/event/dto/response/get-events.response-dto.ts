import { Expose, Type } from 'class-transformer'

class ItemImage {
  @Expose()
  key: string
}

class ItemGenre {
  @Expose()
  name: string
}

class GetEventsItemResponseDto {
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
  @Type(() => ItemImage)
  image: ItemImage
  
  @Expose()
  @Type(() => ItemGenre)
  genres: ItemGenre[]
}

class GetEventsResponseDto {
  @Expose()
  @Type(() => GetEventsItemResponseDto)
  items: GetEventsItemResponseDto[]
  
  @Expose()
  hasMore: boolean
}

export default GetEventsResponseDto
