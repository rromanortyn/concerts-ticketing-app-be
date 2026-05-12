import { IsOptional, Min } from 'class-validator'

import TransformInteger from 'src/shared/decorators/transform-intetger.decorator'

class GetPopularEventsRequestDto {
  @Min(1, { message: '"limit" should be a positive integer' })
  @IsOptional()
  @TransformInteger()
  limit?: number
}

export default GetPopularEventsRequestDto
