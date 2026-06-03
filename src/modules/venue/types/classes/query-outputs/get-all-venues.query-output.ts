import ActionOutput from 'src/shared/types/classes/action.output'

class Item {
  id: number
  name: string
}

class GetAllVenuesQueryOutput extends ActionOutput<Item[], void> {}

export default GetAllVenuesQueryOutput
