import { IsOptional, Min } from 'class-validator'

import TransformInteger from 'src/shared/decorators/transform-intetger.decorator'

class GetPopularEventsRequestDto {
  @Min(1, { message: '"limit" should be a positive integer' })
  @IsOptional()
  @TransformInteger()
  limit?: number

  @Min(1, { message: '"cityId" should be a positive integer' })
  @IsOptional()
  @TransformInteger()
  cityId?: number
}

export default GetPopularEventsRequestDto
