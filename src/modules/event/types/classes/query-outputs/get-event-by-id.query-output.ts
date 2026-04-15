import ActionOutput from 'src/shared/types/classes/action.output'

class Data {
  id: number
  title: string
  description: string
  createdAt: Date
  updatedAt: Date
  genres: Array<{ name: string }>
}

class GetEventByIdQueryOutput extends ActionOutput<Data, void> {}

export default GetEventByIdQueryOutput
