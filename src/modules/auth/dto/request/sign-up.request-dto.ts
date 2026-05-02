import {
  IsEmail,
  IsIn,
  IsString,
  MinLength,
} from 'class-validator'
import Role from 'src/shared/types/enums/role.enum'

class SignUpRequestDto {
  @MinLength(1, { message: `"fullName" should be a non-empty string` })
  @IsString({ message: `"fullName" should be a string` })
  fullName: string

  @IsEmail(
    undefined,
    {
      message: `"email" should be a valid email address`,
    },
  )
  email: string

  @MinLength(6, { message: `"password" should be at least 6 characters long` })
  @IsString({ message: `"password" should be a string` })
  password: string

  @IsIn([Role.Attendee], { message: `"role" should be a valid role` })
  @IsString({ message: `"role" should be a string` })
  role: Role
}

export default SignUpRequestDto
