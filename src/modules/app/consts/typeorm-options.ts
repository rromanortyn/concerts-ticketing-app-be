import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm'

import UserEntity from 'src/data/entities/user.entity'
import envKeys from 'src/shared/consts/env-keys'
import TypeOrmLogger from './typeorm-logger'
import EventEntity from 'src/data/entities/event.entity'
import FileEntity from 'src/data/entities/file.entity'
import GenreEntity from 'src/data/entities/genre.entity'
import CityEntity from 'src/data/entities/city.entity'
import VenueEntity from 'src/data/entities/venue.entity'

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
      UserEntity,
      EventEntity,
      FileEntity,
      GenreEntity,
      CityEntity,
      VenueEntity,
    ],
    logging: true,
    logger: new TypeOrmLogger(),
    extra: {
      max: 50,
    },
  }),
}

export default typeormOptions
