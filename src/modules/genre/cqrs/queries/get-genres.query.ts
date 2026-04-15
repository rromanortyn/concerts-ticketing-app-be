import { Query } from '@nestjs/cqrs'

import GetGenresQueryOutput from '../../types/classes/query-outputs/get-genres.query-output'
import GetGenresQueryInput from '../../types/classes/query-inputs/get-genres.query-input'

class GetGenresQuery extends Query<GetGenresQueryOutput> {
  constructor(readonly input: GetGenresQueryInput) {
    super()
  }
}

export default GetGenresQuery
