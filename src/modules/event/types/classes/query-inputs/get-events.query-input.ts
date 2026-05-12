class GetEventsQueryInput {
  skip: number
  limit?: number
  cityId?: number
  genresIds?: number[]
  dates?: {
    from: Date
    to: Date
  }
}

export default GetEventsQueryInput
