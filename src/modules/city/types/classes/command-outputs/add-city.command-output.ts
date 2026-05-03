import ActionOutput from 'src/shared/types/classes/action.output'

class Data {
  id: number
  name: string
}

class AddCityCommandOutput extends ActionOutput<Data, void> {}

export default AddCityCommandOutput
