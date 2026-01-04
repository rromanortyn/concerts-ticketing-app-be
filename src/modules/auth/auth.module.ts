import { Module } from '@nestjs/common'

import AuthController from './controllers/auth.controller'
import SignUpCommandHandler from './cqrs/command-handlers/sign-up.command-handler'
import AccessTokenService from './services/access-token.service'
import PasswordService from './services/password.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import UserEntity from 'src/data/entities/user.entity'

@Module({
  controllers: [AuthController],
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
  ],
  providers: [
    AccessTokenService,
    PasswordService,
    SignUpCommandHandler,
  ],
})
class AuthModule {}

export default AuthModule
