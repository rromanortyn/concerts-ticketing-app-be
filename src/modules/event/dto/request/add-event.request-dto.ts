import {
  IsString,
  MaxLength,
  MinLength,
  IsNotEmpty,
} from 'class-validator'
import {
  HasMimeType,
  IsFile,
  MaxFileSize,
  MemoryStoredFile,
} from 'nestjs-form-data'

import TransformIso8601String from 'src/shared/decorators/transform-iso-8601-string'
import DateLaterThanField from 'src/shared/decorators/date-later-than-field'

class AddEventRequestDto {
  @MaxFileSize(5e6, { message: `"image" should not be larger than 5MB` })
  @HasMimeType(
    ['image/jpeg', 'image/png'],
    { message: `"image" should be a valid JPEG or PNG file` },
  )
  @IsFile({
    message: `"image" should be a valid image file`,
  })
  image: MemoryStoredFile

  @MinLength(1, { message: `"title" should be a non-empty string` })
  @MaxLength(50, { message: `"title" should not be longer than 50 characters` })
  @IsString({ message: `"title" should be a string` })
  title: string

  @MinLength(1, { message: `"description" should be a non-empty string` })
  @MaxLength(200, { message: `"description" should not be longer than 200 characters` })
  @IsString({ message: `"description" should be a string` })
  description: string

  @TransformIso8601String({ futureOnly: true })
  @IsNotEmpty({ message: '"startDate" is required' })
  startDate: Date

  @TransformIso8601String({ futureOnly: true })
  @DateLaterThanField('startDate', { message: '"endDate" should be after startDate' })
  @IsNotEmpty({ message: '"endDate" is required' })
  endDate: Date
}

export default AddEventRequestDto
