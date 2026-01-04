import argon2 from 'argon2'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import envKeys from 'src/shared/consts/env-keys'

@Injectable()
class PasswordService {
  secret: string

  constructor(
    private readonly configService: ConfigService,
  ) {
    this.secret = configService.getOrThrow(envKeys.auth.password.secret)
  }

  hashPassword(plainPassword: string): Promise<string> {
    return argon2.hash(
      plainPassword,
      {
        secret: Buffer.from(this.secret),
      },
    )
  }
}

export default PasswordService
