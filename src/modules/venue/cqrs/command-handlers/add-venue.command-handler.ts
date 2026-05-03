import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { NotFoundException } from '@nestjs/common'

import AddVenueCommand from '../commands/add-venue.command'
import AddVenueCommandOutput from '../../types/classes/command-outputs/add-venue.command-output'
import VenueEntity from 'src/data/entities/venue.entity'
import ErrorCode from 'src/shared/types/enums/error-code.enum'
import CityEntity from 'src/data/entities/city.entity'

@CommandHandler(AddVenueCommand)
class AddVenueCommandHandler implements ICommandHandler<AddVenueCommand> {
  constructor(
    @InjectRepository(VenueEntity)
    private readonly venueRepository: Repository<VenueEntity>,
    @InjectRepository(CityEntity)
    private readonly cityRepository: Repository<CityEntity>,
  ) {}

  async execute(command: AddVenueCommand): Promise<AddVenueCommandOutput> {
    const { name, cityId } = command.input

    const cityEntity = await this.cityRepository.findOneBy({ id: cityId })

    if (!cityEntity) {
      throw new NotFoundException({
        code: ErrorCode.CityNotFound,
        message: 'A city with the specified id does not exist',
      })
    }

    const venueEntity = await this.venueRepository.save({
      name,
      city: cityEntity,
    })

    return {
      data: {
        id: venueEntity.id,
        name: venueEntity.name,
        cityId: venueEntity.city.id,
      },
    }
  }
}

export default AddVenueCommandHandler
