import { IsString, MaxLength, MinLength } from 'class-validator'

class AddEventRequestDto {
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
