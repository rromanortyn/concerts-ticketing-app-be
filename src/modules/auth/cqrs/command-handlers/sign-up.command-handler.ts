import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'

import SignUpCommand from '../commands/sign-up.command'
import SignUpCommandOutput from '../../types/classes/command-outputs/sign-up.command-output'

@CommandHandler(SignUpCommand)
class SignUpCommandHandler implements ICommandHandler<SignUpCommand> {
  async execute(command: SignUpCommand): Promise<SignUpCommandOutput> {
    return {
      data: {
        email: 'vasia@gmail.com',
        accessToken: 'sjdflsdfksldfk',
      },
    }
  }
}

export default SignUpCommandHandler
