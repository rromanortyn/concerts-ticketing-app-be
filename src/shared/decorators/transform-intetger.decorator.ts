import { Transform } from 'class-transformer'
import { BadRequestException } from '@nestjs/common'

import ErrorCode from 'src/shared/types/enums/error-code.enum'

const TransformInteger = () => {
  return Transform(({ key, value }) => {
    const valueAsNumber = Number(value)
    const isInt = Number.isInteger(valueAsNumber)

    if (!isInt) {
      throw new BadRequestException({
        code: ErrorCode.ValidationError,
        message: `"${key}" should be an integer`,
      })
    }

    return valueAsNumber
  })
}

export default TransformInteger
