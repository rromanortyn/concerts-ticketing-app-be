import ActionOutput from 'src/shared/types/classes/action.output'

class Data {
  id: number
  title: string
  description: string
  createdAt: Date
  updatedAt: Date
}

class GetEventByIdQueryOutput extends ActionOutput<Data, void> {}

export default GetEventByIdQueryOutput
