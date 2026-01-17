import ActionOutput from 'src/shared/types/classes/action.output'

class Data {
  id: number
  fullName: string
  email: string
}

class GetMeQueryOutput extends ActionOutput<Data, void> {}

export default GetMeQueryOutput
