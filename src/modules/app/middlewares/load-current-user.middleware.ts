import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common'
import { Response, NextFunction } from 'express'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { JsonWebTokenError } from '@nestjs/jwt'

import UserEntity from 'src/data/entities/user.entity'
import AppRequest from 'src/shared/types/interfaces/app-request'
import AccessTokenService from 'src/modules/auth/services/access-token.service'

@Injectable()
class LoadCurrentUserMiddleware implements NestMiddleware {
  constructor(
    private readonly accessTokenService: AccessTokenService,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async use(req: AppRequest, res: Response, next: NextFunction): Promise<void> {
    const authorization = req.headers['authorization']
    const token: string | undefined = Array.isArray(authorization)
      ? authorization[0].split(' ')[1]
      : authorization?.split(' ')[1]

    if (token) {
      try {
        const payload = await this.accessTokenService.verify(token)
        const user = await this.userRepository.findOne({
          where: { id: payload.id },
          select: [
            'id',
            'fullName',
            'email',
            'role',
          ],
        })

        if (user) {
          req.user = user
        }
      }
      
      catch (error) {
        switch (true) {
          case error instanceof JsonWebTokenError:
            req.authError = new UnauthorizedException({
              code: 'INVALID_ACCESS_TOKEN',
              message: 'The provided access token is invalid.',
            })

            break

          default:
            req.authError = error
        }
      }
    }

    next()
  }
}

export default LoadCurrentUserMiddleware
