import { Module } from '@nestjs/common'
import { RouterModule } from '@nestjs/core'
import { CqrsModule } from '@nestjs/cqrs'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule } from '@nestjs/config'

import routes from './consts/routes'
import AuthModule from '../auth/auth.module'
import typeormOptions from './consts/typeorm-options'
import configOptions from './consts/config-options'

@Module({
  imports: [
    ConfigModule.forRoot(configOptions),
    TypeOrmModule.forRootAsync(typeormOptions),
    CqrsModule.forRoot(),
    RouterModule.register(routes),
    AuthModule,
  ],
})
class AppModule {}

export default AppModule
