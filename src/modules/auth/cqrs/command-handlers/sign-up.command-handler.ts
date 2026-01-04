import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'

import SignUpCommand from '../commands/sign-up.command'
import SignUpCommandOutput from '../../types/classes/command-outputs/sign-up.command-output'
import AccessTokenService from '../../services/access-token.service'
import { InjectRepository } from '@nestjs/typeorm'
import UserEntity from 'src/data/entities/user.entity'
import { Repository } from 'typeorm'
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

    const userByEmailExists = await this.userRepository.exists({
      where: {
        email,
      },
      select: {
        id: true,
      },
    })

    if (userByEmailExists) {
      throw new ConflictException({
        code: 'USER_ALREADY_EXISTS',
        message: 'A user with the specified email already exists.',
      })
    }

    const hashedPassword = await this.passwordService.hashPassword(password)

    const newUser = await this.userRepository.save({
      ...command.input,
      password: hashedPassword,
    })

    const accessToken = await this.accessTokenService.sign({
      id: newUser.id,
    })

    return {
      data: {
        email,
        accessToken,
      },
    }
  }
}

export default SignUpCommandHandler
