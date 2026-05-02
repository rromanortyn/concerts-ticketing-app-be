import {
  Body,
  Controller,
  Post,
} from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'

import SignUpRequestDto from '../dto/request/sign-up.request-dto'
import SignUpResponseDto from '../dto/response/sign-up.response-dto'
import SignUpCommand from '../cqrs/commands/sign-up.command'
import LoginRequestDto from '../dto/request/login.request-dto'
import LoginResponseDto from '../dto/response/login.response-dto'
import LoginCommand from '../cqrs/commands/login.command'
import Public from 'src/shared/decorators/public.decorator'

@Controller()
class AuthController {
  constructor(
    private readonly commandBus: CommandBus,
  ) {}

  @Post('sign-up')
  @Public()
  async signUp(@Body() dto: SignUpRequestDto): Promise<SignUpResponseDto> {
    const { data } = await this.commandBus.execute(
      new SignUpCommand({
        email: dto.email,
        fullName: dto.fullName,
        password: dto.password,
        role: dto.role,
      }),
    )

    return data
  }

  @Post('login')
  @Public()
  async login(@Body() dto: LoginRequestDto): Promise<LoginResponseDto> {
    const { data } = await this.commandBus.execute(
      new LoginCommand({
        email: dto.email,
        password: dto.password,
      }),
    )

    return data
  }
}

export default AuthController
