import { Query } from '@nestjs/cqrs'

import GetEventByIdQueryOutput from 'src/modules/event/types/classes/query-outputs/get-event-by-id.query-output'
import GetEventByIdQueryInput from 'src/modules/event/types/classes/query-inputs/get-event-by-id.query-input'

class GetEventByIdQuery extends Query<GetEventByIdQueryOutput> {
  constructor(readonly input: GetEventByIdQueryInput) {
    super()
  }
}

export default GetEventByIdQuery
