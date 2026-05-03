import {
  Column,
  Entity,
  OneToMany,
} from 'typeorm'

import BaseEntity from './base.entity'
import TableName from 'src/shared/types/enums/table-name.enum'
import VenueEntity from './venue.entity'

@Entity(TableName.Cities)
class CityEntity extends BaseEntity {
  @Column({ type: 'varchar' })
  name: string
  
  @OneToMany(() => VenueEntity, venue => venue.city)
  venues: VenueEntity[]
}

export default CityEntity
