import { Global, Module } from '@nestjs/common'

import MinioUploadService from './services/implementations/minio-upload.service'
import providerNames from './consts/provider-names'

@Global()
@Module({
  providers: [
    {
      provide: providerNames.minioUploadService,
      useClass: MinioUploadService,
    },
  ],
  exports: [
    {
      provide: providerNames.minioUploadService,
      useClass: MinioUploadService,
    },
  ],
})
class UploadModule {}

export default UploadModule
