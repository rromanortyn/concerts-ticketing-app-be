import { NestFactory } from '@nestjs/core'

import AppModule from './modules/app/app.module'

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule)

  const port = process.env.PORT ?? 4000

  await app.listen(port)

  console.log(`Listening on http://localhost:${port}`)
}

bootstrap()
