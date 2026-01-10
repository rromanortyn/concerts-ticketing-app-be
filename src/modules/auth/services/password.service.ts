import argon2 from 'argon2'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import envKeys from 'src/shared/consts/env-keys'

@Injectable()
class PasswordService {

  private readonly secret: Buffer

  constructor(
    private readonly configService: ConfigService,
  ) {
    this.secret = Buffer.from(configService.getOrThrow(envKeys.auth.password.secret))
  }

  hashPassword(plainPassword: string): Promise<string> {
    return argon2.hash(
      plainPassword,
      {
        secret: this.secret,
      },
    )
  }

  verify(hash: string, plainPassword: string): Promise<boolean> {
    return argon2.verify(
      hash,
      plainPassword,
      {
        secret: this.secret,
      },
    )
  }
}

export default PasswordService
