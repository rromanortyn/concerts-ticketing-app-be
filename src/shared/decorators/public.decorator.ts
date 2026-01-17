import { applyDecorators, SetMetadata } from '@nestjs/common'

import MetadataKey from '../types/enums/metadata-key.enum'

const Public = () => applyDecorators(
  SetMetadata(MetadataKey.IsPublic, true),
)

export default Public
