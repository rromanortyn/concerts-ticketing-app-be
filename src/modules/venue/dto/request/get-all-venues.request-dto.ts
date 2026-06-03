import { Min } from 'class-validator'

import TransformInteger from 'src/shared/decorators/transform-intetger.decorator'

class GetAllVenuesRequestDto {
  @TransformInteger()
  @Min(1, { message: '"cityId" should be a positive integer' })
  cityId: number
}

export default GetAllVenuesRequestDto
