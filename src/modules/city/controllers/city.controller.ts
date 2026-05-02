import { Controller, Post } from '@nestjs/common'

import Roles from 'src/shared/decorators/roles.decorator'
import Role from 'src/shared/types/enums/role.enum'

@Controller()
class CityController {
  @Post()
  @Roles(Role.Admin)
  async addCity() {
    return 'new city'
  }
}

export default CityController
