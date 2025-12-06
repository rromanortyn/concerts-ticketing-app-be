import { Module } from '@nestjs/common'

import AuthController from './controllers/auth.controller'
import SignUpCommandHandler from './cqrs/command-handlers/sign-up.command-handler'

@Module({
  controllers: [AuthController],
  providers: [
    SignUpCommandHandler,
  ],
})
class AuthModule {}

export default AuthModule
