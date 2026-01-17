import { Controller, Get } from '@nestjs/common'
import { QueryBus } from '@nestjs/cqrs'

import GetMeQuery from '../cqrs/queries/get-me.query'
import CurrentUser from 'src/shared/decorators/current-user.decorator'

@Controller()
class MeController {
  constructor(
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  async getMe(@CurrentUser('id') userId: number) {
    const { data } = await this.queryBus.execute(new GetMeQuery({ id: userId }))

    return data
  }
}

export default MeController
