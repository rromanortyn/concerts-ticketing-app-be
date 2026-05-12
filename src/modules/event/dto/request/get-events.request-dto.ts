import { IsOptional, Min } from 'class-validator'
import TransformArrayOfIntegers from 'src/shared/decorators/transform-array-of-integers'

import TransformInteger from 'src/shared/decorators/transform-intetger.decorator'

class GetEventsRequestDto {
  @Min(0, { message: '"skip" should be a non-negative integer' })
  @TransformInteger()
  skip: number
  
  @Min(1, { message: '"limit" should be a positive integer' })
  @IsOptional()
  @TransformInteger()
  limit?: number

  @Min(1, { message: '"cityId" should be a positive integer' })
  @IsOptional()
  @TransformInteger()
  cityId?: number

  @Min(1, { message: 'Each item of "genresIds" should be a positive integer', each: true })
  @IsOptional()
  @TransformArrayOfIntegers()
  genresIds?: number[]
}

export default GetEventsRequestDto
