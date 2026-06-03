import ActionOutput from 'src/shared/types/classes/action.output'

class Item {
  id: number
  name: string
}

class GetCitiesQueryOutput extends ActionOutput<Item[], void> {}

export default GetCitiesQueryOutput
