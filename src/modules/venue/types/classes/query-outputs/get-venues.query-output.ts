import ActionOutput from 'src/shared/types/classes/action.output'

class EventItem {
  id: number
  title: string
  description: string
  startDate: Date
  endDate: Date
  image: { src: string }
  genres: Array<{ name: string }>
  city: { name: string }
}

class Item {
  id: number
  name: string
  image: { src: string }
  events: EventItem[]
}

class Data {
  items: Item[]
}

class GetVenuesQueryOutput extends ActionOutput<Data, void> {}

export default GetVenuesQueryOutput
