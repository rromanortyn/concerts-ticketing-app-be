import { Query } from '@nestjs/cqrs'

import GetMeQueryOutput from '../../types/classes/query-output/get-me.query-output'
import GetMeQueryInput from '../../types/classes/query-inputs/get-me.query-input'

class GetMeQuery extends Query<GetMeQueryOutput> {
  constructor(readonly input: GetMeQueryInput) {
    super()
  }
}

export default GetMeQuery
