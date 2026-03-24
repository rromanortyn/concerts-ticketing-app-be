import path from 'node:path'
import dotenv from 'dotenv'
import { DataSource } from 'typeorm'

import UserEntity from '../../data/entities/user.entity'
import EventEntity from 'src/data/entities/event.entity'

import envKeys from 'src/shared/consts/env-keys'
import AddUserEntity1767524262509 from 'src/data/migrations/1767524262509-add-user-entity'
import AddEventEntity1774338558113 from 'src/data/migrations/1774338558113-add-event-entity'

dotenv.config({
  path: path.join(process.cwd(), '.env.docker'),
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
  ],
  migrations: [
    AddUserEntity1767524262509,
    AddEventEntity1774338558113,
  ],
})

export default dataSource
