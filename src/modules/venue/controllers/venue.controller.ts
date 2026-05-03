import {
  Body,
  Controller,
  Post,
} from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { plainToInstance } from 'class-transformer'

import Roles from 'src/shared/decorators/roles.decorator'
import Role from 'src/shared/types/enums/role.enum'
import AddVenueRequestDto from '../dto/request/add-venue.request-dto'
import AddVenueCommand from '../cqrs/commands/add-venue.command'
import AddVenueResponseDto from '../dto/response/add-venue.response-dto'

@Controller()
class VenueController {
  constructor(
    private readonly commandBus: CommandBus,
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
}

export default VenueController
