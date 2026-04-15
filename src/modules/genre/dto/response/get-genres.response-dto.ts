import { Expose } from 'class-transformer'

class GetGenresItemResponseDto {
  @Expose()
  id: number
  
  @Expose()
  name: string
  
  @Expose()
  slug: string
}

export default GetGenresItemResponseDto
