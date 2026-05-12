import { BadRequestException, ValidationPipeOptions } from '@nestjs/common'

import ErrorCode from 'src/shared/types/enums/error-code.enum'

const validationPipeConfig: ValidationPipeOptions = {
  whitelist: true,
  transform: true,
  exceptionFactory(errors) {
    const { constraints } = errors[0]

    let message: string

    if (constraints) {
      message = Object.values(constraints)[0]
    }
    
    else {
      message = Object.values(errors[0].children?.[0]?.constraints!)[0]
    }

    return new BadRequestException({
      code: ErrorCode.ValidationError,
      message,
    })
  },
}

export default validationPipeConfig
