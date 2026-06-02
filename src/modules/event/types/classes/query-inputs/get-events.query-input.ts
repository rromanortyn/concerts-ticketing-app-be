class GetEventsQueryInput {
  skip: number
  limit?: number
  cityId?: number
  genresIds?: number[]
  venuesIds?: number[]
  dates?: {
    from: Date
    to: Date
  }
}

export default GetEventsQueryInput
