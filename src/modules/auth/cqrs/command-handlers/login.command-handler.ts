import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { Repository } from 'typeorm'
import { UnauthorizedException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import LoginCommand from '../commands/login.command'
import LoginCommandOutput from '../../types/classes/command-outputs/login.command-output'
import AccessTokenService from '../../services/access-token.service'
import UserEntity from 'src/data/entities/user.entity'
import PasswordService from '../../services/password.service'

@CommandHandler(LoginCommand)
class LoginCommandHandler implements ICommandHandler<LoginCommand> {
  constructor(
    private readonly accessTokenService: AccessTokenService,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly passwordService: PasswordService,
  ) {}

  async execute(command: LoginCommand): Promise<LoginCommandOutput> {
    const { email, password } = command.input

    const userByEmail = await this.userRepository.findOne({
      where: {
        email,
      },
      select: ['id', 'password'],
    })

    if (!userByEmail) {
      throw new UnauthorizedException({
        code: 'WRONG_EMAIL_OR_PASSWORD',
        message: 'The specified email or password is incorrect.',
      })
    }

    const { password: hash } = userByEmail
  
    const passwordIsCorrect = await this.passwordService.verify(hash, password)

    if (!passwordIsCorrect) {
      throw new UnauthorizedException({
        code: 'WRONG_EMAIL_OR_PASSWORD',
        message: 'The specified email or password is incorrect.',
      })
    }

    const accessToken = await this.accessTokenService.sign({
      id: userByEmail.id,
      role: userByEmail.role,
    })

    return {
      data: {
        accessToken,
      },
    }
  }
}

export default LoginCommandHandler
