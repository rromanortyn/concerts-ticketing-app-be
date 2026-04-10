import { Transform } from 'class-transformer'
import { isISO8601 } from 'class-validator'
import { BadRequestException } from '@nestjs/common'

import ErrorCode from '../types/enums/error-code.enum'

const TransformIso8601String = (options?: { futureOnly?: boolean }) => {
  return Transform(({ value }) => {
    const isIso8601 = isISO8601(value)
    
    if (!isIso8601) {
      throw new BadRequestException({
        code: ErrorCode.ValidationError,
        message: '"startDate" should be a valid ISO 8601 date string',
      })
    }

    const dateObject = new Date(value)

    if (options?.futureOnly && dateObject < new Date()) {
      throw new BadRequestException({
        code: ErrorCode.ValidationError,
        message: '"startDate" should be a future date',
      })
    }

    return dateObject
  })
}

export default TransformIso8601String
