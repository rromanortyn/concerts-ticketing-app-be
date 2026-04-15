import ActionOutput from 'src/shared/types/classes/action.output'

class Item {
  id: number
  title: string
  description: string
  createdAt: Date
  updatedAt: Date
  genres: Array<{ name: string }>
}

class Data extends Array<Item> {}

class GetEventsQueryOutput extends ActionOutput<Data, void> {}

export default GetEventsQueryOutput
