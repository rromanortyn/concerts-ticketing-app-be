import {
  Body,
  Controller,
  Get,
  Post,
  Query,
} from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { plainToInstance } from 'class-transformer'

import Roles from 'src/shared/decorators/roles.decorator'
import Role from 'src/shared/types/enums/role.enum'
import AddVenueRequestDto from '../dto/request/add-venue.request-dto'
import AddVenueCommand from '../cqrs/commands/add-venue.command'
import AddVenueResponseDto from '../dto/response/add-venue.response-dto'
import GetVenuesRequestDto from '../dto/request/get-venues.request-dto'
import GetVenuesQuery from '../cqrs/queries/get-venues.query'
import GetVenuesResponseDto from '../dto/response/get-venues.response-dto'
import GetAllVenuesRequestDto from '../dto/request/get-all-venues.request-dto'
import GetAllVenuesQuery from '../cqrs/queries/get-all-venues.query'
import GetAllVenuesResponseDto from '../dto/response/get-all-venues.response-dto'

@Controller()
class VenueController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @Roles(Role.Admin)
  async addVenue(@Body() dto: AddVenueRequestDto): Promise<AddVenueResponseDto> {
    const { data } = await this.commandBus.execute(
      new AddVenueCommand(dto),
    )

    return plainToInstance(
      AddVenueResponseDto,
      data,
      { excludeExtraneousValues: true },
    )
  }

  @Get()
  async getVenues(@Query() dto: GetVenuesRequestDto): Promise<GetVenuesResponseDto> {
    const { data } = await this.queryBus.execute(
      new GetVenuesQuery(dto),
    )

    return plainToInstance(
      GetVenuesResponseDto,
      data,
      { excludeExtraneousValues: true },
    )
  }

  @Get('all')
  async getAllVenues(@Query() dto: GetAllVenuesRequestDto): Promise<GetAllVenuesResponseDto[]> {
    const { data } = await this.queryBus.execute(
      new GetAllVenuesQuery(dto),
    )

    return plainToInstance(
      GetAllVenuesResponseDto,
      data,
      { excludeExtraneousValues: true },
    )
  }
}

export default VenueController
