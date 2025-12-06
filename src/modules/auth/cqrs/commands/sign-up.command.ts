import { Command } from '@nestjs/cqrs'

import SignUpCommandInput from '../../types/classes/command-inputs/sign-up.command-input'
import SignUpCommandOutput from '../../types/classes/command-outputs/sign-up.command-output'

class SignUpCommand extends Command<SignUpCommandOutput> {
  constructor(readonly input: SignUpCommandInput) {
    super()
  }
}

export default SignUpCommand
