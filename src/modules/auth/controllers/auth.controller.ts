import {
  Body,
  Controller,
  Post,
} from '@nestjs/common'

import SignUpRequestDto from '../dto/request/sign-up.request-dto'
import SignUpResponseDto from '../dto/response/sign-up.response-dto'

@Controller()
class AuthController {
  @Post('sign-up')
  async signUp(@Body() dto: SignUpRequestDto): Promise<SignUpResponseDto> {
    return {
      email: 'vasia@gmail.com',
      accessToken: 'sdkjfksjdfkjskfdjksdf',
    }
  }
}

export default AuthController
