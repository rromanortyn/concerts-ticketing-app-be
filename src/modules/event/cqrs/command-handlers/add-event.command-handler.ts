import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { Inject, NotFoundException } from '@nestjs/common'
import { DataSource, In } from 'typeorm'
import { v4 as uuidv4 } from 'uuid'

import AddEventCommand from '../commands/add-event.command'
import AddEventCommandOutput from '../../types/classes/command-outputs/add-event.command-output'
import EventEntity from 'src/data/entities/event.entity'
import type UploadService from 'src/libs/upload/services/interfaces/upload.service'
import uploadProviderNames from 'src/libs/upload/consts/provider-names'
import FileEntity from 'src/data/entities/file.entity'
import GenreEntity from 'src/data/entities/genre.entity'
import ErrorCode from 'src/shared/types/enums/error-code.enum'
import VenueEntity from 'src/data/entities/venue.entity'

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
      genresIds,
      venueId,
    } = command.input
    
    const uploadedImage = await this.uploadService.uploadFile({
      file: image,
      directory: 'event-images',
      uuid: uuidv4(),
    })

    const newEvent = await this.dataSource.transaction(async (manager) => {
      const existingGenres = await manager.find(
        GenreEntity,
        {
          where: {
            id: In(genresIds),
          },
        },
      )

      if (existingGenres.length !== genresIds.length) {
        const existingGenreIds = existingGenres.map((genre) => genre.id)
        const missingGenreIds = genresIds.filter((id) => !existingGenreIds.includes(id))

        const formattedMissingGenreIds = `[${missingGenreIds.join(', ')}]`

        throw new NotFoundException({
          code: ErrorCode.GenresNotFound,
          message: `Some genres do not exist. The following is the array of the missing genre IDs: ${formattedMissingGenreIds}`,
        })
      }

      const venueEntity = await manager.findOne(
        VenueEntity,
        {
          where: {
            id: venueId,
          },
          relations: ['city'],
        },
      )

      if (!venueEntity) {
        throw new NotFoundException({
          code: ErrorCode.VenueNotFound,
          message: 'A venue with the specified id does not exist',
        })
      }
      
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
          genres: existingGenres,
          venue: venueEntity,
          city: venueEntity.city,
        },
      )

      return eventEntity
    })

    const imagePresignedUrl = await this.uploadService.getPresignedUrl(uploadedImage.key)
    
    return {
      data: {
        ...newEvent,
        image: {
          src: imagePresignedUrl,
        },
      },
    }
  }
}

export default AddEventCommandHandler
