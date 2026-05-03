import {
  Body,
  Controller,
  Post,
} from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { plainToInstance } from 'class-transformer'

import Roles from 'src/shared/decorators/roles.decorator'
import Role from 'src/shared/types/enums/role.enum'
import AddCityRequestDto from '../dto/request/add-city.request-dto'
import AddCityCommand from '../cqrs/commands/add-city.command'
import AddCityResponseDto from '../dto/response/add-city.response-dto'

@Controller()
class CityController {
  constructor(
    private readonly commandBus: CommandBus,
  ) {}

  @Post()
  @Roles(Role.Admin)
  async addCity(@Body() dto: AddCityRequestDto): Promise<AddCityResponseDto> {
    const { data } = await this.commandBus.execute(
      new AddCityCommand(dto),
    )

    return plainToInstance(
      AddCityResponseDto,
      data,
      { excludeExtraneousValues: true },
    )
  }
}

export default CityController
