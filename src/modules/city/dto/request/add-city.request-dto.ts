import {
  IsEmail,
  IsString,
  MinLength,
} from 'class-validator'

class AddCityRequestDto {
  @MinLength(1, {
    message: `"name" should be at least 1 character long`
  })
  @IsString({ message: `"name" should be a string` })
  name: string
}

export default AddCityRequestDto
