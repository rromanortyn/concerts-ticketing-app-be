import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { MemoryStoredFile } from 'nestjs-form-data'
import * as Minio from 'minio'

import UploadService from '../interfaces/upload.service'

@Injectable()
class MinioUploadService implements UploadService {
  private minioClient: Minio.Client
  private bucketName: string

  constructor(private readonly configService: ConfigService) {
    const minioPort = this.configService.getOrThrow('MINIO_PORT_INNER')

    this.minioClient = new Minio.Client({
      endPoint: this.configService.getOrThrow('MINIO_HOST_INNER'),
      port: parseInt(minioPort, 10),
      useSSL: this.configService.getOrThrow('MINIO_USE_SSL') === 'true',
      accessKey: this.configService.getOrThrow('MINIO_ROOT_USER'),
      secretKey: this.configService.getOrThrow('MINIO_ROOT_PASSWORD'),
    })

    this.bucketName = this.configService.getOrThrow('MINIO_BUCKET_NAME')
  }

  async uploadFile(file: MemoryStoredFile): Promise<void> {
    await this.minioClient.putObject(
      this.bucketName, 
      file.originalName, 
      file.buffer,
      file.size,
      {
        contentType: file.mimetype,
      },
    )
  }
}

export default MinioUploadService
