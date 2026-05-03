import {
  Column,
  Entity,
  ManyToOne,
} from 'typeorm'

import BaseEntity from './base.entity'
import TableName from 'src/shared/types/enums/table-name.enum'
import CityEntity from './city.entity'

@Entity(TableName.Venues)
class VenueEntity extends BaseEntity {
  @Column({ type: 'varchar' })
  name: string

  @ManyToOne(() => CityEntity, city => city.venues)
  city: CityEntity
}

export default VenueEntity
