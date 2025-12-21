import { Module } from '@nestjs/common'

import AuthController from './controllers/auth.controller'
import SignUpCommandHandler from './cqrs/command-handlers/sign-up.command-handler'
import AccessTokenService from './services/access-token.service'

@Module({
  controllers: [AuthController],
  providers: [
    AccessTokenService,
    SignUpCommandHandler,
  ],
})
class AuthModule {}

export default AuthModule
