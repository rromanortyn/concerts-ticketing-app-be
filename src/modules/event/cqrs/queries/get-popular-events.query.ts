import { Query } from '@nestjs/cqrs'

import GetEventsQueryOutput from 'src/modules/event/types/classes/query-outputs/get-events.query-output'
import GetPopularEventsQueryInput from 'src/modules/event/types/classes/query-inputs/get-popular-events.query-input'

class GetPopularEventsQuery extends Query<GetEventsQueryOutput> {
  constructor(readonly input: GetPopularEventsQueryInput) {
    super()
  }
}

export default GetPopularEventsQuery
