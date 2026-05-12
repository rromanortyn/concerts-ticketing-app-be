import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
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
import GetEventsResponseDto from '../dto/response/get-events.response-dto'
import GetEventsRequestDto from '../dto/request/get-events.request-dto'
import GetPopularEventsRequestDto from '../dto/request/get-popular-events.request-dto'
import GetPopularEventsQuery from '../cqrs/queries/get-popular-events.query'

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
  async getEvents(@Query() dto: GetEventsRequestDto): Promise<GetEventsResponseDto> {
    const { data } = await this.queryBus.execute(
      new GetEventsQuery(dto),
    )

    return plainToInstance(
      GetEventsResponseDto,
      data,
      { excludeExtraneousValues: true },
    )
  }

  @Get('popular')
  async getPopularEvents(@Query() dto: GetPopularEventsRequestDto) {
    const { data } = await this.queryBus.execute(
      new GetPopularEventsQuery(dto),
    )

    return plainToInstance(
      GetEventsResponseDto,
      data,
      { excludeExtraneousValues: true },
    )
  }

  @Get(':id')
  async getEventById(
    @Param('id', new IntParamPipe('id'))
    id: number,
  ): Promise<GetEventByIdResponseDto> {
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
