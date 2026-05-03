import { Type } from 'class-transformer'
import { IsInt, Min } from 'class-validator'

class GetEventsRequestDto {
  @Min(0, { message: '"skip" should be a non-negative integer' })
  @IsInt({ message: '"skip" should be an integer' })
  @Type(() => Number)
  skip: number
  
  @Min(1, { message: '"limit" should be a positive integer' })
  @IsInt({ message: '"limit" should be an integer' })
  @Type(() => Number)
  limit: number
}

export default GetEventsRequestDto
