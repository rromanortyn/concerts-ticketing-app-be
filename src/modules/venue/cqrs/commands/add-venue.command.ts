import { Command } from '@nestjs/cqrs'

import AddVenueCommandInput from '../../types/classes/command-inputs/add-venue.command-input'
import AddVenueCommandOutput from '../../types/classes/command-outputs/add-venue.command-output'

class AddVenueCommand extends Command<AddVenueCommandOutput> {
  constructor(readonly input: AddVenueCommandInput) {
    super()
  }
}

export default AddVenueCommand
