import path from 'node:path'
import dotenv from 'dotenv'
import { DataSource } from 'typeorm'

import UserEntity from 'src/data/entities/user.entity'
import EventEntity from 'src/data/entities/event.entity'
import FileEntity from 'src/data/entities/file.entity'
import GenreEntity from 'src/data/entities/genre.entity'
import CityEntity from 'src/data/entities/city.entity'
import VenueEntity from 'src/data/entities/venue.entity'
import EventGenreEntity from 'src/data/entities/event-genre.entity'

import envKeys from 'src/shared/consts/env-keys'
import AddUserEntity1767524262509 from 'src/data/migrations/1767524262509-add-user-entity'
import AddEventEntity1774338558113 from 'src/data/migrations/1774338558113-add-event-entity'
import AddBasicEventDates1775983995124 from 'src/data/migrations/1775983995124-add-basic-event-dates'
import AddEventImage1776064997067 from 'src/data/migrations/1776064997067-add-event-image'
import MakeEventImageNotNullable1776065620433 from 'src/data/migrations/1776065620433-make-event-image-not-nullable'
import AddGenreEntity1776238984839 from 'src/data/migrations/1776238984839-add-genre-entity'
import SeedGenres1776239333199 from 'src/data/migrations/1776239333199-seed-genres'
import AddEventGenresManyToMany1776244200074 from 'src/data/migrations/1776244200074-add-event-genres-many-to-many'
import AddCityEntity1777759804533 from 'src/data/migrations/1777759804533-add-city-entity'
import AddUserRole1777761528457 from 'src/data/migrations/1777761528457-add-user-role'
import AddVenueEntity1777804228297 from 'src/data/migrations/1777804228297-add-venue-entity'
import AddEventVenue1778492921430 from 'src/data/migrations/1778492921430-add-event-venue'
import AddEventCity1778570810419 from 'src/data/migrations/1778570810419-add-event-city'

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
    GenreEntity,
    CityEntity,
    VenueEntity,
    EventGenreEntity,
  ],
  migrations: [
    AddUserEntity1767524262509,
    AddEventEntity1774338558113,
    AddBasicEventDates1775983995124,
    AddEventImage1776064997067,
    MakeEventImageNotNullable1776065620433,
    AddGenreEntity1776238984839,
    SeedGenres1776239333199,
    AddEventGenresManyToMany1776244200074,
    AddCityEntity1777759804533,
    AddUserRole1777761528457,
    AddVenueEntity1777804228297,
    AddEventVenue1778492921430,
    AddEventCity1778570810419,
  ],
})

export default dataSource
