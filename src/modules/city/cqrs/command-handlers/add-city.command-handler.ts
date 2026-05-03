import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'

import AddCityCommand from '../commands/add-city.command'
import AddCityCommandOutput from '../../types/classes/command-outputs/add-city.command-output'
import CityEntity from 'src/data/entities/city.entity'

@CommandHandler(AddCityCommand)
class AddCityCommandHandler implements ICommandHandler<AddCityCommand> {
  constructor(
    @InjectRepository(CityEntity)
    private readonly cityRepository: Repository<CityEntity>,
  ) {}

  async execute(command: AddCityCommand): Promise<AddCityCommandOutput> {
    const { name } = command.input

    const cityEntity = await this.cityRepository.save({
      name,
    })

    return {
      data: {
        id: cityEntity.id,
        name: cityEntity.name,
      },
    }
  }
}

export default AddCityCommandHandler
