import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common'
import { APP_GUARD, RouterModule } from '@nestjs/core'
import { CqrsModule } from '@nestjs/cqrs'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'

import routes from './consts/routes'
import AuthModule from '../auth/auth.module'
import MeModule from '../me/me.module'
import typeormOptions from './consts/typeorm-options'
import configOptions from './consts/config-options'
import jwtOptions from './consts/jwt-options'
import LoadCurrentUserMiddleware from './middlewares/load-current-user.middleware'
import UserEntity from 'src/data/entities/user.entity'
import AuthGuard from 'src/shared/guards/auth.guard'

@Module({
  imports: [
    ConfigModule.forRoot(configOptions),
    TypeOrmModule.forRootAsync(typeormOptions),
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.register(jwtOptions),
    CqrsModule.forRoot(),
    RouterModule.register(routes),
    AuthModule,
    MeModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(LoadCurrentUserMiddleware)
      .forRoutes({
        path: '*',
        method: RequestMethod.ALL,
      })
  }
}

export default AppModule
