import { IsOptional, Max, Min } from 'class-validator'

import TransformInteger from 'src/shared/decorators/transform-intetger.decorator'

class GetVenuesRequestDto {
  @TransformInteger()
  @Min(1, { message: '"cityId" should be a positive integer' })
  @IsOptional()
  cityId?: number

  @TransformInteger()
  @Min(1, { message: '"limit" should be a positive integer' })
  @Max(5, { message: '"limit" should be less than or equal to 5' })
  @IsOptional()
  limit?: number
}

export default GetVenuesRequestDto
