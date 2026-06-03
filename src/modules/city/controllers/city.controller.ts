import {
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { plainToInstance } from 'class-transformer'

import Roles from 'src/shared/decorators/roles.decorator'
import Role from 'src/shared/types/enums/role.enum'
import AddCityRequestDto from '../dto/request/add-city.request-dto'
import AddCityCommand from '../cqrs/commands/add-city.command'
import AddCityResponseDto from '../dto/response/add-city.response-dto'
import GetCitiesQuery from '../cqrs/queries/get-cities.query'
import GetCitiesResponseDto from '../dto/response/get-cities.response-dto'

@Controller()
class CityController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  async getCities(): Promise<GetCitiesResponseDto[]> {
    const { data } = await this.queryBus.execute(
      new GetCitiesQuery(),
    )

    return plainToInstance(
      GetCitiesResponseDto,
      data,
      {
        excludeExtraneousValues: true,
      },
    )
  }

  @Post()
  @Roles(Role.Admin)
  async addCity(@Body() dto: AddCityRequestDto): Promise<AddCityResponseDto> {
    const { data } = await this.commandBus.execute(
      new AddCityCommand(dto),
    )

    return plainToInstance(
      AddCityResponseDto,
      data,
      {
        excludeExtraneousValues: true,
      },
    )
  }
}

export default CityController
