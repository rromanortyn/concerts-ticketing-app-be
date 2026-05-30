import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import * as Minio from 'minio'

import UploadService from '../interfaces/upload.service'
import UploadFileInput from '../../types/interfaces/service-inputs/upload-file.input'
import UploadFileOutput from '../../types/interfaces/service-outputs/upload-file.output'

@Injectable()
class MinioUploadService implements UploadService {
  private minioClient: Minio.Client
  private bucketName: string

  constructor(private readonly configService: ConfigService) {
    const minioPort = this.configService.getOrThrow('MINIO_PORT')

    this.minioClient = new Minio.Client({
      endPoint: this.configService.getOrThrow('MINIO_HOST'),
      port: parseInt(minioPort, 10),
      useSSL: this.configService.getOrThrow('MINIO_USE_SSL') === 'true',
      accessKey: this.configService.getOrThrow('MINIO_ROOT_USER'),
      secretKey: this.configService.getOrThrow('MINIO_ROOT_PASSWORD'),
    })

    this.bucketName = this.configService.getOrThrow('MINIO_BUCKET_NAME')
  }

  async uploadFile(input: UploadFileInput): Promise<UploadFileOutput> {
    const {
      file,
      directory,
      uuid,
    } = input

    const {
      mimetype,
      buffer,
      size,
    } = file

    const extension = mimetype.split('/')[1]
    const key = `${directory}/${uuid}.${extension}`

    await this.minioClient.putObject(
      this.bucketName,
      key,
      buffer,
      size,
      {
        'Content-Type': mimetype,
      },
    )

    return {
      key,
      mimeType: mimetype,
      size,
    }
  }
  
  async getPresignedUrl(key: string): Promise<string> {
    return this.minioClient.presignedUrl(
      'GET',
      this.bucketName,
      key,
      // the 4th parameter is expiration time in seconds
    )
  }
}

export default MinioUploadService
