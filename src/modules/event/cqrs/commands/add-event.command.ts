import { Command } from '@nestjs/cqrs'

import AddEventCommandInput from 'src/modules/event/types/classes/command-inputs/add-event.command-input'
import AddEventCommandOutput from 'src/modules/event/types/classes/command-outputs/add-event.command-output'

class AddEventCommand extends Command<AddEventCommandOutput> {
  constructor(readonly input: AddEventCommandInput) {
    super()
  }
}

export default AddEventCommand
