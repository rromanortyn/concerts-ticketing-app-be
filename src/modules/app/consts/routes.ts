import { Routes } from '@nestjs/core'

import AuthModule from 'src/modules/auth/auth.module'

const routes: Routes = [
  {
    path: 'auth',
    module: AuthModule,
  },
]

export default routes
