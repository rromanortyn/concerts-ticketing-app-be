import {
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator'
import {
  IsFile,
  MaxFileSize,
  MemoryStoredFile,
} from 'nestjs-form-data'

class AddEventRequestDto {
  @MaxFileSize(5e6, { message: `"image" should not be larger than 5MB` })
  @IsFile({
    message: `"image" should be a valid image file`,
  })
  image: MemoryStoredFile

  @MinLength(1, { message: `"title" should not be a non-empty string` })
  @MaxLength(50, { message: `"title" should not be longer than 50 characters` })
  @IsString({ message: `"title" should be a string` })
  title: string

  @MinLength(1, { message: `"description" should not be a non-empty string` })
  @MaxLength(200, { message: `"description" should not be longer than 200 characters` })
  @IsString({ message: `"description" should be a string` })
  description: string
}

export default AddEventRequestDto
