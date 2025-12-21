import { Module } from '@nestjs/common'
import { RouterModule } from '@nestjs/core'
import { CqrsModule } from '@nestjs/cqrs'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'

import routes from './consts/routes'
import AuthModule from '../auth/auth.module'
import typeormOptions from './consts/typeorm-options'
import configOptions from './consts/config-options'
import jwtOptions from './consts/jwt-options'

@Module({
  imports: [
    ConfigModule.forRoot(configOptions),
    TypeOrmModule.forRootAsync(typeormOptions),
    JwtModule.register(jwtOptions),
    CqrsModule.forRoot(),
    RouterModule.register(routes),
    AuthModule,
  ],
})
class AppModule {}

export default AppModule
