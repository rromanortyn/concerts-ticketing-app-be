import { Routes } from '@nestjs/core'

import AuthModule from 'src/modules/auth/auth.module'
import EventModule from 'src/modules/event/event.module'
import GenreModule from 'src/modules/genre/genre.module'
import MeModule from 'src/modules/me/me.module'

const routes: Routes = [
  {
    path: 'auth',
    module: AuthModule,
  },
  {
    path: 'me',
    module: MeModule,
  },
  {
    path: 'events',
    module: EventModule,
  },
  {
    path: 'genres',
    module: GenreModule,
  },
]

export default routes
