import { Module } from '@nestjs/common'
import { RouterModule } from '@nestjs/core'

import routes from './consts/routes'
import AuthModule from '../auth/auth.module'

@Module({
  imports: [
    RouterModule.register(routes),
    AuthModule,
  ],
})
class AppModule {}

export default AppModule
