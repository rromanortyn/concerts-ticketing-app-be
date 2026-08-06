import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
} from 'typeorm'

import BaseEntity from './base.entity'
import TableName from 'src/shared/types/enums/table-name.enum'
import CityEntity from './city.entity'
import EventEntity from './event.entity'

@Entity(TableName.Venues)
class VenueEntity extends BaseEntity {
  @Column({ type: 'varchar', unique: true })
  name!: string

  @ManyToOne(() => CityEntity, (city) => city.venues)
  city!: CityEntity

  @OneToMany(() => EventEntity, (event) => event.venue)
  events!: EventEntity[]
}

export default VenueEntity
