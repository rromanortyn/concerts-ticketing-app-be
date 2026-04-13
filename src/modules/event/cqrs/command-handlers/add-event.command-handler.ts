import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { Inject } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { v4 as uuidv4 } from 'uuid'

import AddEventCommand from '../commands/add-event.command'
import AddEventCommandOutput from '../../types/classes/command-outputs/add-event.command-output'
import EventEntity from 'src/data/entities/event.entity'
import type UploadService from 'src/libs/upload/services/interfaces/upload.service'
import uploadProviderNames from 'src/libs/upload/consts/provider-names'
import FileEntity from 'src/data/entities/file.entity'

@CommandHandler(AddEventCommand)
class AddEventCommandHandler implements ICommandHandler<AddEventCommand> {
  constructor(
    @Inject(uploadProviderNames.minioUploadService)
    private readonly uploadService: UploadService,
    private readonly dataSource: DataSource,
  ) {}

  async execute(command: AddEventCommand): Promise<AddEventCommandOutput> {
    const {
      image,
      title,
      description,
      startDate,
      endDate,
    } = command.input
    
    const uploadedImage = await this.uploadService.uploadFile({
      file: image,
      directory: 'event-images',
      uuid: uuidv4(),
    })

    const newEvent = await this.dataSource.transaction(async (manager) => {
      const imageFileEntity = await manager.save(
        FileEntity,
        {
          originalName: image.originalName,
          key: uploadedImage.key,
          mimeType: uploadedImage.mimeType,
          size: uploadedImage.size,
        },
      )

      const eventEntity = await manager.save(
        EventEntity,
        {
          title,
          description,
          startDate,
          endDate,
          image: imageFileEntity,
        },
      )

      return eventEntity
    })
    
    return {
      data: newEvent,
    }
  }
}

export default AddEventCommandHandler
