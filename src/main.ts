import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'

import AppModule from './modules/app/app.module'
import validationPipeConfig from './modules/app/consts/validation-pipe-config'

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(new ValidationPipe(validationPipeConfig))
  app.useGlobalGuards()

  const port = process.env.PORT ?? 4000

  await app.listen(port)

  console.log(`Listening on http://localhost:${port}`)
}

bootstrap()
