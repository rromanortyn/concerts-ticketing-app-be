import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { Repository } from 'typeorm'
import { ConflictException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import SignUpCommand from '../commands/sign-up.command'
import SignUpCommandOutput from '../../types/classes/command-outputs/sign-up.command-output'
import AccessTokenService from '../../services/access-token.service'
import UserEntity from 'src/data/entities/user.entity'
import PasswordService from '../../services/password.service'
import ErrorCode from 'src/shared/types/enums/error-code.enum'

@CommandHandler(SignUpCommand)
class SignUpCommandHandler implements ICommandHandler<SignUpCommand> {
  constructor(
    private readonly accessTokenService: AccessTokenService,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly passwordService: PasswordService,
  ) {}

  async execute(command: SignUpCommand): Promise<SignUpCommandOutput> {
    const { email, password } = command.input

    const hashedPassword = await this.passwordService.hashPassword(password)

    let accessToken: string = ''

    try {
      const newUser = await this.userRepository.save({
        ...command.input,
        password: hashedPassword,
      })

      accessToken = await this.accessTokenService.sign({
        id: newUser.id,
        role: newUser.role,
      })
    }

    catch (error) {
      if (error.code === '23505') {
        throw new ConflictException({
          code: ErrorCode.UserAlreadyExists,
          message: 'A user with the specified email already exists.',
        })
      }
    }

    return {
      data: {
        email,
        accessToken,
      },
    }
  }
}

export default SignUpCommandHandler
