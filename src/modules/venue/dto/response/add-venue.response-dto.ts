import { Expose } from 'class-transformer'

class AddVenueResponseDto {
  @Expose()
  id: number
  
  @Expose()
  name: string

  @Expose()
  cityId: number
}

export default AddVenueResponseDto
