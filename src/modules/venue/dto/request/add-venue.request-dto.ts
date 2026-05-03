import {
  IsInt,
  IsString,
  Min,
  MinLength,
} from 'class-validator'

class AddVenueRequestDto {
  @MinLength(1, { message: `"name" should be at least 1 character long` })
  @IsString({ message: `"name" should be a string` })
  name: string

  @Min(1, { message: `"cityId" should be at least 1` })
  @IsInt({ message: `"cityId" should be an integer` })
  cityId: number
}

export default AddVenueRequestDto
