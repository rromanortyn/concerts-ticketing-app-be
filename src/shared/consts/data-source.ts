import path from 'node:path'
import dotenv from 'dotenv'
import { DataSource } from 'typeorm'

import UserEntity from 'src/data/entities/user.entity'
import EventEntity from 'src/data/entities/event.entity'
import FileEntity from 'src/data/entities/file.entity'

import envKeys from 'src/shared/consts/env-keys'
import AddUserEntity1767524262509 from 'src/data/migrations/1767524262509-add-user-entity'
import AddEventEntity1774338558113 from 'src/data/migrations/1774338558113-add-event-entity'
import AddBasicEventDates1775983995124 from 'src/data/migrations/1775983995124-add-basic-event-dates'
import AddEventImage1776064997067 from 'src/data/migrations/1776064997067-add-event-image'
import MakeEventImageNotNullable1776065620433 from 'src/data/migrations/1776065620433-make-event-image-not-nullable'

const nodeEnv = process.env.NODE_ENV

dotenv.config({
  path: path.join(process.cwd(), `.env.${nodeEnv}`),
})

const dataSource = new DataSource({
  type: 'postgres',
  host: process.env[envKeys.database.host],
  port: parseInt(process.env[envKeys.database.port]!),
  username: process.env[envKeys.database.username],
  password: process.env[envKeys.database.password],
  database: process.env[envKeys.database.name],
  entities: [
    UserEntity,
    EventEntity,
    FileEntity,
  ],
  migrations: [
    AddUserEntity1767524262509,
    AddEventEntity1774338558113,
    AddBasicEventDates1775983995124,
    AddEventImage1776064997067,
    MakeEventImageNotNullable1776065620433,
  ],
})

export default dataSource
