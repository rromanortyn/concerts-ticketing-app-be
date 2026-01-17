import { createParamDecorator, ExecutionContext } from '@nestjs/common'

import AppUser from '../types/interfaces/app-user'
import AppRequest from '../types/interfaces/app-request'

type CurrentUserOutput = AppUser[keyof AppUser] | AppUser | undefined

const CurrentUser = createParamDecorator(
  (key: keyof AppUser, ctx: ExecutionContext): CurrentUserOutput => {
    const request = ctx.switchToHttp().getRequest<AppRequest>()
    const user = request.user

    if (!user) {
      return undefined
    }

    if (!key) {
      return user
    }

    return user[key]
  },
)

export default CurrentUser
