import ActionOutput from 'src/shared/types/classes/action.output'

class Item {
  id: number
  title: string
  description: string
  createdAt: Date
  updatedAt: Date
  genres: Array<{ name: string }>
}

class Data {
  items: Item[]
  hasMore: boolean
}

class GetEventsQueryOutput extends ActionOutput<Data, void> {}

export default GetEventsQueryOutput
