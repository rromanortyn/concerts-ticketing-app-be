import { Command } from '@nestjs/cqrs'

import LoginCommandInput from '../../types/classes/command-inputs/login.command-input'
import LoginCommandOutput from '../../types/classes/command-outputs/login.command-output'

class LoginCommand extends Command<LoginCommandOutput> {
  constructor(readonly input: LoginCommandInput) {
    super()
  }
}

export default LoginCommand
