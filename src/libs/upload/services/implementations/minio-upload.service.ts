import os from 'node:os'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import * as Minio from 'minio'

import UploadService from '../interfaces/upload.service'
import UploadFileInput from '../../types/interfaces/service-inputs/upload-file.input'
import UploadFileOutput from '../../types/interfaces/service-outputs/upload-file.output'
import getLocalIp from 'src/shared/utils/get-local-ip'
import envKeys from 'src/shared/consts/env-keys'

@Injectable()
class MinioUploadService implements UploadService {
  private minioClient: Minio.Client
  private bucketName: string

  constructor(private readonly configService: ConfigService) {
    const minioHost = this.configService.getOrThrow(envKeys.minio.host)
    const minioPort = this.configService.getOrThrow(envKeys.minio.port)

    this.minioClient = new Minio.Client({
      endPoint: minioHost === '127.0.0.1' ? getLocalIp() : minioHost,
      port: parseInt(minioPort, 10),
      useSSL: this.configService.getOrThrow(envKeys.minio.useSSL) === 'true',
      accessKey: this.configService.getOrThrow(envKeys.minio.rootUser),
      secretKey: this.configService.getOrThrow(envKeys.minio.rootPassword),
    })

    this.bucketName = this.configService.getOrThrow(envKeys.minio.bucketName)
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
