import ActionOutput from 'src/shared/types/classes/action.output'

class Data  {
  id: number
  title: string
  description: string
  createdAt: Date
  updatedAt: Date
}

class AddEventCommandOutput extends ActionOutput<Data, void> {}

export default AddEventCommandOutput
