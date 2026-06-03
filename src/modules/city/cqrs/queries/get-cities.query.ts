import { Query } from '@nestjs/cqrs'

import GetCitiesQueryOutput from '../../types/classes/query-outputs/get-cities.query-output'

class GetCitiesQuery extends Query<GetCitiesQueryOutput> {}

export default GetCitiesQuery
