import {
  Column,
  Entity,
  OneToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
} from 'typeorm'

import BaseEntity from './base.entity'
import TableName from 'src/shared/types/enums/table-name.enum'
import FileEntity from './file.entity'
import GenreEntity from './genre.entity'
import VenueEntity from './venue.entity'
import CityEntity from './city.entity'

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

  @ManyToOne(
    () => VenueEntity, 
    (venue) => venue.events, 
    { onDelete: 'RESTRICT', onUpdate: 'NO ACTION' })
  venue: VenueEntity
  
  @ManyToOne(
    () => CityEntity, 
    (city) => city.events, 
    { onDelete: 'RESTRICT', onUpdate: 'NO ACTION' })
  city: CityEntity
}

export default EventEntity
