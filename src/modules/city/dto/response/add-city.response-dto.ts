import { Expose } from 'class-transformer'

class AddCityResponseDto {
  @Expose()
  id: number
  
  @Expose()
  name: string
}

export default AddCityResponseDto
