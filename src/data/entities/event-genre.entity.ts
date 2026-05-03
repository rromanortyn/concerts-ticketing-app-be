import {
  Entity,
  ManyToOne,
  PrimaryColumn,
  JoinColumn,
} from 'typeorm'

import TableName from 'src/shared/types/enums/table-name.enum'
import EventEntity from './event.entity'
import GenreEntity from './genre.entity'

@Entity(TableName.EventGenres)
class EventGenreEntity {
  @PrimaryColumn()
  eventId: number

  @PrimaryColumn()
  genreId: number

  @ManyToOne(() => EventEntity, (event) => event.genres)
  @JoinColumn({ name: 'eventId' })
  event: EventEntity

  @ManyToOne(() => GenreEntity, (genre) => genre.events)
  @JoinColumn({ name: 'genreId' })
  genre: GenreEntity
}

export default EventGenreEntity
