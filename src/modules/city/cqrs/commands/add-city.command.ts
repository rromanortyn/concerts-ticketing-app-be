import { Command } from '@nestjs/cqrs'

import AddCityCommandInput from '../../types/classes/command-inputs/add-city.command-input'
import AddCityCommandOutput from '../../types/classes/command-outputs/add-city.command-output'

class AddCityCommand extends Command<AddCityCommandOutput> {
  constructor(readonly input: AddCityCommandInput) {
    super()
  }
}

export default AddCityCommand
