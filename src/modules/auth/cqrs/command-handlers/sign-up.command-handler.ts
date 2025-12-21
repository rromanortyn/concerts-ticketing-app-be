import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'

import SignUpCommand from '../commands/sign-up.command'
import SignUpCommandOutput from '../../types/classes/command-outputs/sign-up.command-output'
import AccessTokenService from '../../services/access-token.service'

@CommandHandler(SignUpCommand)
class SignUpCommandHandler implements ICommandHandler<SignUpCommand> {
  constructor(
    private readonly accessTokenService: AccessTokenService,
  ) {}

  async execute(command: SignUpCommand): Promise<SignUpCommandOutput> {
    const accessToken = await this.accessTokenService.sign({
      id: 1,
    })

    return {
      data: {
        email: 'vasia@gmail.com',
        accessToken,
      },
    }
  }
}

export default SignUpCommandHandler
