import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'

import AddEventRequestDto from '../dto/request/add-event.request-dto'
import AddEventCommand from '../cqrs/commands/add-event.command'
import AddEventResponseDto from '../dto/response/add-event.response-dto'
import GetEventsResponseDto from '../dto/response/get-events.response-dto'
import GetEventsQuery from '../cqrs/queries/get-events.query'
import GetEventByIdQuery from '../cqrs/queries/get-event-by-id.query'
import ErrorCode from 'src/shared/types/enums/error-code.enum'
import IntParamPipe from 'src/shared/pipes/int-param.pipe'

@Controller()
class EventController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  async addEvent(@Body() dto: AddEventRequestDto): Promise<AddEventResponseDto> {
    const { data } = await this.commandBus.execute(
      new AddEventCommand(dto),
    )

    return data
  }

  @Get()
  async getEvents(): Promise<GetEventsResponseDto> {
    const { data } = await this.queryBus.execute(
      new GetEventsQuery(),
    )

    return data
  }

  @Get(':id')
  async getEventById(@Param('id', new IntParamPipe('id'))  id: number): Promise<GetEventsResponseDto[number]> {
    const { data } = await this.queryBus.execute(
      new GetEventByIdQuery({ id }),
    )

    return data
  }
}

export default EventController
