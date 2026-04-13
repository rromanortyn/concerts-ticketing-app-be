import { Query } from '@nestjs/cqrs'

import GetEventsQueryOutput from 'src/modules/event/types/classes/query-outputs/get-events.query-output'

class GetEventsQuery extends Query<GetEventsQueryOutput> {
  constructor() {
    super()
  }
}

export default GetEventsQuery
