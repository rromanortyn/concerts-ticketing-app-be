import { IsOptional, Min } from 'class-validator'

import TransformInteger from 'src/shared/decorators/transform-intetger.decorator'

class GetPopularEventsRequestDto {
  @TransformInteger()
  @Min(1, { message: '"limit" should be a positive integer' })
  @IsOptional()
  limit?: number

  @TransformInteger()
  @Min(1, { message: '"cityId" should be a positive integer' })
  @IsOptional()
  cityId?: number
}

export default GetPopularEventsRequestDto
