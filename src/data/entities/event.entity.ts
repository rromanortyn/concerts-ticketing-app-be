import {
  Column,
  Entity,
  OneToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm'

import BaseEntity from './base.entity'
import TableName from 'src/shared/types/enums/table-name.enum'
import FileEntity from './file.entity'
import GenreEntity from './genre.entity'

@Entity(TableName.Events)
class EventEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 50 })
  title: string

  @Column({ type: 'varchar', length: 200 })
  description: string

  @Column({ type: 'timestamptz' })
  startDate: Date

  @Column({ type: 'timestamptz' })
  endDate: Date

  @OneToOne(() => FileEntity, { nullable: false })
  @JoinColumn({ name: 'imageId' })
  image: FileEntity

  @ManyToMany(
    () => GenreEntity,
    (genre) => genre.events,
    { nullable: false },
  )
  @JoinTable({
    name: TableName.EventGenres,
    joinColumn: {
      name: 'eventId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'genreId',
      referencedColumnName: 'id',
    },
  })
  genres: GenreEntity[]
}

export default EventEntity
