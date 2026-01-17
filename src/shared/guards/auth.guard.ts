
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { Reflector } from '@nestjs/core'

import MetadataKey from '../types/enums/metadata-key.enum'
import AppRequest from '../types/interfaces/app-request'

@Injectable()
class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<AppRequest>()
    const isPublic = this.reflector.get<boolean>(
      MetadataKey.IsPublic,
      context.getHandler(),
    )
    const { user, authError } = request

    if (isPublic) {
      return true
    }

    if (authError) {
      throw authError
    }
    
    return !!user
  }
}

export default AuthGuard