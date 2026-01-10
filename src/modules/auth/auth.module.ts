import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import AuthController from './controllers/auth.controller'
import SignUpCommandHandler from './cqrs/command-handlers/sign-up.command-handler'
import AccessTokenService from './services/access-token.service'
import PasswordService from './services/password.service'
import UserEntity from 'src/data/entities/user.entity'
import LoginCommandHandler from './cqrs/command-handlers/login.command-handler'

@Module({
  controllers: [AuthController],
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
  ],
  providers: [
    AccessTokenService,
    PasswordService,
    SignUpCommandHandler,
    LoginCommandHandler,
  ],
})
class AuthModule {}

export default AuthModule
