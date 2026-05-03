import ActionOutput from 'src/shared/types/classes/action.output'

class Data {
  id: number
  name: string
  cityId: number
}

class AddVenueCommandOutput extends ActionOutput<Data, void> {}

export default AddVenueCommandOutput
