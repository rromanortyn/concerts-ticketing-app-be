import {
  IsEmail,
  IsString,
  MinLength,
} from 'class-validator'

class LoginRequestDto {
  @IsEmail(
    undefined,
    {
      message: `"email" should be a valid email address`,
    },
  )
  email: string

  @MinLength(6, {
    message: `"password" should be at least 6 characters long`
  })
  @IsString({ message: `"password" should be a string` })
  password: string
}

export default LoginRequestDto
