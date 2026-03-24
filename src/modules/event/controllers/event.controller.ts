import {
  Body,
  Controller,
  Post,
} from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'

import AddEventRequestDto from '../dto/request/add-event.request-dto'
import AddEventCommand from '../cqrs/commands/add-event.command'

@Controller()
class EventController {
  constructor(
    private readonly commandBus: CommandBus,
  ) {}

  @Post()
  async addEvent(@Body() dto: AddEventRequestDto) {
    const { data } = await this.commandBus.execute(
      new AddEventCommand(dto),
    )

    return data
  }
}

export default EventController
