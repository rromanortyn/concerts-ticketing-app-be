import { applyDecorators, SetMetadata } from '@nestjs/common'

import MetadataKey from '../types/enums/metadata-key.enum'

const Roles = (...roles: string[]) => applyDecorators(
  SetMetadata(MetadataKey.Roles, roles),
)

export default Roles
