const eventGenres = [
    {
        eventId: 1,
        genreId: 1,
    },
    {
        eventId: 1,
        genreId: 2,
    },
    {
        eventId: 2,
        genreId: 9,
    },
]

const genres = [
    {
        id: 1,
        name: 'Rock',
    },
    {
        id: 2,
        name: 'Jazz',
    },
    {
        id: 9,
        name: 'EDM',
    },
]

const eventsIds = [...new Set(eventGenres.map((eventGenre) => eventGenre.eventId))]

const eventsWithGenres = eventsIds
  .map((eventId) => ({
    eventId,
    genres: eventGenres
      .filter((eventGenre) => eventGenre.eventId === eventId)
      .map((eventGenre) => eventGenre.genreId),
  }))

console.log(eventsWithGenres)
