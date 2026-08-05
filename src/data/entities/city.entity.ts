import {
  Column,
  Entity,
  OneToMany,
} from 'typeorm'

import BaseEntity from './base.entity'
import TableName from 'src/shared/types/enums/table-name.enum'
import VenueEntity from './venue.entity'
import EventEntity from './event.entity'

@Entity(TableName.Cities)
class CityEntity extends BaseEntity {
  @Column({ type: 'varchar' })
  name!: string

  @Column({ type: 'varchar', unique: true })
  slug!: string
  
  @OneToMany(() => VenueEntity, (venue) => venue.city)
  venues!: VenueEntity[]
  
  @OneToMany(() => EventEntity, (event) => event.city)
  events!: EventEntity[]
}

export default CityEntity
