import ActionOutput from 'src/shared/types/classes/action.output'

class Data {
  id: number
  title: string
  description: string
  startDate: Date
  endDate: Date
  image: {
    src: string,
  }
  genres: {
    id: number,
    name: string,
    slug: string,
  }[]
  venue: {
    id: number,
    name: string,
  }
}

class AddEventCommandOutput extends ActionOutput<Data, void> {}

export default AddEventCommandOutput
