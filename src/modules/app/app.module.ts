import { Module } from '@nestjs/common'
import { RouterModule } from '@nestjs/core'
import { CqrsModule } from '@nestjs/cqrs'

import routes from './consts/routes'
import AuthModule from '../auth/auth.module'

@Module({
  imports: [
    CqrsModule.forRoot(),
    RouterModule.register(routes),
    AuthModule,
  ],
})
class AppModule {}

export default AppModule
