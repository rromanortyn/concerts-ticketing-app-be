import ActionOutput from 'src/shared/types/classes/action.output'

class Data {
  accessToken: string
}

class LoginCommandOutput extends ActionOutput<Data, void> {}

export default LoginCommandOutput
