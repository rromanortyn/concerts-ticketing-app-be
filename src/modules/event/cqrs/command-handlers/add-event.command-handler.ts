import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { Repository } from 'typeorm'
import { UnauthorizedException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import AddEventCommand from '../commands/add-event.command'
import AddEventCommandOutput from '../../types/classes/command-outputs/add-event.command-output'
import EventEntity from 'src/data/entities/event.entity'

@CommandHandler(AddEventCommand)
class AddEventCommandHandler implements ICommandHandler<AddEventCommand> {
  constructor(
    @InjectRepository(EventEntity)
    private readonly eventRepository: Repository<EventEntity>,
  ) {}

  async execute(command: AddEventCommand): Promise<AddEventCommandOutput> {
    const { title, description } = command.input

    const newEvent = await this.eventRepository.save({
      title,
      description,
    })

    return {
      data: newEvent,
    }
  }
}

export default AddEventCommandHandler
