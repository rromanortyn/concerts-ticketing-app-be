import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'

import SignUpCommand from '../commands/sign-up.command'
import SignUpCommandOutput from '../../types/classes/command-outputs/sign-up.command-output'
import AccessTokenService from '../../services/access-token.service'
import { InjectRepository } from '@nestjs/typeorm'
import UserEntity from 'src/data/entities/user.entity'
import { QueryFailedError, Repository, TypeORMError } from 'typeorm'
import { ConflictException } from '@nestjs/common'
import PasswordService from '../../services/password.service'

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
      })
    }

    catch (error) {
      if (error.code === '23505') {
        throw new ConflictException({
          code: 'USER_ALREADY_EXISTS',
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
