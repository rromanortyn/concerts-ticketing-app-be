import ActionOutput from 'src/shared/types/classes/action.output'

class Data {
  email: string
  accessToken: string
}

class SignUpCommandOutput extends ActionOutput<Data, void> {}

export default SignUpCommandOutput
