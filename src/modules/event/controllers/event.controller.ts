import {
  Body,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { FormDataRequest } from 'nestjs-form-data'
import { plainToInstance } from 'class-transformer'

import AddEventRequestDto from '../dto/request/add-event.request-dto'
import AddEventCommand from '../cqrs/commands/add-event.command'
import AddEventResponseDto from '../dto/response/add-event.response-dto'
import GetEventsQuery from '../cqrs/queries/get-events.query'
import GetEventByIdQuery from '../cqrs/queries/get-event-by-id.query'
import GetEventByIdResponseDto from '../dto/response/get-event-by-id.response-dto'
import IntParamPipe from 'src/shared/pipes/int-param.pipe'
import GetEventsItemResponseDto from '../dto/response/get-events.response-dto'

@Controller()
class EventController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @FormDataRequest()
  async addEvent(@Body() dto: AddEventRequestDto): Promise<AddEventResponseDto> {
    const { data } = await this.commandBus.execute(
      new AddEventCommand(dto),
    )

    return plainToInstance(
      AddEventResponseDto,
      data,
      { excludeExtraneousValues: true },
    )
  }

  @Get()
  async getEvents(): Promise<GetEventsItemResponseDto[]> {
    const { data } = await this.queryBus.execute(
      new GetEventsQuery(),
    )

    return plainToInstance(
      GetEventsItemResponseDto,
      data,
      { excludeExtraneousValues: true },
    )
  }

  @Get(':id')
  async getEventById(
    @Param('id', new IntParamPipe('id'))
    id: number,
  ): Promise<GetEventsItemResponseDto> {
    const { data } = await this.queryBus.execute(
      new GetEventByIdQuery({ id }),
    )

    return plainToInstance(
      GetEventByIdResponseDto,
      data,
      { excludeExtraneousValues: true },
    )
  }
}

export default EventController
