import { BadRequestException, ValidationPipeOptions } from '@nestjs/common'

import ErrorCode from 'src/shared/types/enums/error-code.enum'

const validationPipeConfig: ValidationPipeOptions = {
  whitelist: true,
  transform: true,
  exceptionFactory(errors) {
    console.log(errors)
    const { constraints } = errors[0]
    const message = Object.values(constraints!)[0]

    return new BadRequestException({
      code: ErrorCode.ValidationError,
      message,
    })
  },
}

export default validationPipeConfig
