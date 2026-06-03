import { Expose } from 'class-transformer'

class GetAllVenuesResponseDto {
  @Expose()
  id: number

  @Expose()
  name: string
}

export default GetAllVenuesResponseDto
