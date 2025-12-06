import { Controller, Post } from '@nestjs/common'

@Controller()
class AuthController {
  @Post('sign-up')
  async signUp() {
    return 'hello'
  }
}

export default AuthController
