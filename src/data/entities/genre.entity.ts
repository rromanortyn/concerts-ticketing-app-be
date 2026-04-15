import {
  Column,
  Entity,
  ManyToMany,
} from 'typeorm'

import BaseEntity from './base.entity'
import TableName from 'src/shared/types/enums/table-name.enum'
import EventEntity from './event.entity'

@Entity(TableName.Genres)
class GenreEntity extends BaseEntity {
  @Column({ type: 'varchar' })
  name: string

  @Column({ type: 'varchar', unique: true })
  slug: string

  @ManyToMany(
    () => EventEntity,
    (event) => event.genres,
    { nullable: false },
  )
  events: EventEntity[]
}

export default GenreEntity
