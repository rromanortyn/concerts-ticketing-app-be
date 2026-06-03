import { Expose } from 'class-transformer'

class GetCitiesResponseDto {
  @Expose()
  id: number

  @Expose()
  name: string
}

export default GetCitiesResponseDto
