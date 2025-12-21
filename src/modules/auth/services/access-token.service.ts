import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import ms from 'ms'

import envKeys from 'src/shared/consts/env-keys'
import JwtPayload from 'src/shared/types/interfaces/jwt-payload'

@Injectable()
class AccessTokenService {
  secret: string
  expiresIn: string

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.secret = configService.getOrThrow(envKeys.jwt.access.secret)
    this.expiresIn = configService.getOrThrow(envKeys.jwt.access.expiresIn)
  }

  sign(payload: JwtPayload): Promise<string> {
    return this.jwtService.signAsync<JwtPayload>(
      payload,
      {
        secret: this.secret,
        expiresIn: this.expiresIn as ms.StringValue,
      },
    )
  }
}

export default AccessTokenService
