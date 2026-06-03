import { Query } from '@nestjs/cqrs'

import GetAllVenuesQueryInput from '../../types/classes/query-inputs/get-all-venues.query-input'
import GetAllVenuesQueryOutput from '../../types/classes/query-outputs/get-all-venues.query-output'

class GetAllVenuesQuery extends Query<GetAllVenuesQueryOutput> {
  constructor(readonly input: GetAllVenuesQueryInput) {
    super()
  }
}

export default GetAllVenuesQuery
