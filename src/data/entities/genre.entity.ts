import {
  Column,
  Entity,
} from 'typeorm'

import BaseEntity from './base.entity'
import TableName from 'src/shared/types/enums/table-name.enum'

@Entity(TableName.Genres)
class GenreEntity extends BaseEntity {
  @Column({ type: 'varchar' })
  name: string

  @Column({ type: 'varchar', unique: true })
  slug: string
}

export default GenreEntity
