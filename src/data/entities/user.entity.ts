import {
  Column,
  Entity,
} from 'typeorm'

import BaseEntity from './base.entity'
import TableName from 'src/shared/types/enums/table-name.enum'

@Entity(TableName.Users)
class UserEntity extends BaseEntity {
  @Column()
  fullName: string

  @Column({ unique: true })
  email: string

  @Column({ select: false, nullable: true })
  password: string
}

export default UserEntity
