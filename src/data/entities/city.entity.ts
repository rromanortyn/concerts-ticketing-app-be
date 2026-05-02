import {
  Column,
  Entity,
} from 'typeorm'

import BaseEntity from './base.entity'
import TableName from 'src/shared/types/enums/table-name.enum'

@Entity(TableName.Cities)
class CityEntity extends BaseEntity {
  @Column({ type: 'varchar' })
  name: string
}

export default CityEntity
