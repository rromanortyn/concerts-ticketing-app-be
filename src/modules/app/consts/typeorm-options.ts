import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm'

import envKeys from 'src/shared/consts/env-keys'

const typeormOptions: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => ({
    type: 'postgres',
    host: configService.get(envKeys.database.host),
    port: parseInt(configService.getOrThrow(envKeys.database.port)),
    username: configService.get(envKeys.database.username),
    password: configService.get(envKeys.database.password),
    database: configService.get(envKeys.database.name),
    entities: [
      
    ],
    logging: true,
    extra: {
      max: 50,
    },
  }),
}

export default typeormOptions
