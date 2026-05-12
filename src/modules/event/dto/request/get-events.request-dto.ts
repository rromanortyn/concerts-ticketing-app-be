import { Type } from 'class-transformer'
import { IsNotEmpty, IsOptional, Min, Validate, ValidateNested } from 'class-validator'
import DateLaterThanField from 'src/shared/decorators/date-later-than-field'
import TransformArrayOfIntegers from 'src/shared/decorators/transform-array-of-integers'

import TransformInteger from 'src/shared/decorators/transform-intetger.decorator'
import TransformIso8601String from 'src/shared/decorators/transform-iso-8601-string'

class DatesFilterDto {
  @TransformIso8601String({ futureOnly: true, key: 'dates.from' })
  @IsNotEmpty({ message: '"dates.from" is required' })
  from: Date

  @TransformIso8601String({ futureOnly: true, key: 'dates.to' })
  @DateLaterThanField('from', { message: '"dates.to" should be after "dates.from"' })
  @IsNotEmpty({ message: '"dates.to" is required' })
  to: Date
}

class GetEventsRequestDto {
  @TransformInteger()
  @Min(0, { message: '"skip" should be a non-negative integer' })
  skip: number
  
  @TransformInteger()
  @Min(1, { message: '"limit" should be a positive integer' })
  @IsOptional()
  limit?: number

  @TransformInteger()
  @Min(1, { message: '"cityId" should be a positive integer' })
  @IsOptional()
  cityId?: number

  @TransformArrayOfIntegers()
  @Min(1, { message: 'Each item of "genresIds" should be a positive integer', each: true })
  @IsOptional()
  genresIds?: number[]
  
  @ValidateNested()
  @Type(() => DatesFilterDto)
  @IsOptional()
  dates?: DatesFilterDto
}

export default GetEventsRequestDto
