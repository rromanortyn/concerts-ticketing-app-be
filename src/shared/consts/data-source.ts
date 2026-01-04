import path from 'node:path'
import dotenv from 'dotenv'
import { DataSource } from 'typeorm'

import UserEntity from '../../data/entities/user.entity'

import envKeys from 'src/shared/consts/env-keys'
import AddUserEntity1767524262509 from 'src/data/migrations/1767524262509-add-user-entity'

dotenv.config({
  path: path.join(process.cwd(), '.env.docker'),
})

const dataSource = new DataSource({
  type: 'postgres',
  host: process.env[envKeys.database.hostOutside],
  port: parseInt(process.env[envKeys.database.portOutside]!),
  username: process.env[envKeys.database.username],
  password: process.env[envKeys.database.password],
  database: process.env[envKeys.database.name],
  entities: [
    UserEntity,
  ],
  migrations: [
    AddUserEntity1767524262509,
  ],
})

export default dataSource
