import {
  Column,
  Entity,
} from 'typeorm'

import BaseEntity from './base.entity'
import TableName from 'src/shared/types/enums/table-name.enum'

@Entity(TableName.Files)
class FileEntity extends BaseEntity {
  @Column({ type: 'varchar' })
  originalName: string

  @Column({ type: 'varchar', unique: true })
  key: string

  @Column({ type: 'varchar' })
  mimeType: string

  @Column({ type: 'bigint' })
  size: number
}

export default FileEntity
