import { Query } from '@nestjs/cqrs'

import GetEventsQueryOutput from 'src/modules/event/types/classes/query-outputs/get-events.query-output'
import GetEventsQueryInput from 'src/modules/event/types/classes/query-inputs/get-events.query-input'

class GetEventsQuery extends Query<GetEventsQueryOutput> {
  constructor(readonly input: GetEventsQueryInput) {
    super()
  }
}

export default GetEventsQuery
