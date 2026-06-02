import { Query } from '@nestjs/cqrs'

import GetVenuesQueryInput from '../../types/classes/query-inputs/get-venues.query-input'
import GetVenuesQueryOutput from '../../types/classes/query-outputs/get-venues.query-output'

class GetVenuesQuery extends Query<GetVenuesQueryOutput> {
  constructor(readonly input: GetVenuesQueryInput) {
    super()
  }
}

export default GetVenuesQuery
