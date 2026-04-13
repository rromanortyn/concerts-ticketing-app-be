import { Transform } from 'class-transformer'
import { isISO8601 } from 'class-validator'
import { BadRequestException } from '@nestjs/common'

import ErrorCode from '../types/enums/error-code.enum'

interface TransformIso8601StringOptions {
  futureOnly?: boolean,
  timezoneIsRequired?: boolean,
}

const defaultOptions: TransformIso8601StringOptions = {
  futureOnly: false,
  timezoneIsRequired: false,
}

// Z is not acceptable, only numeric offsets (+00:00, -05:00, etc.)
// Examples:
// 2029-04-13T06:11:24.031+03:00
// 2039-04-23T06:01:04.000+00:00
const iso8601RegExp = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?([+-]\d{2}:?\d{2})$/

const TransformIso8601String = (
  options: TransformIso8601StringOptions = defaultOptions
) => {
  return Transform(({ key, value }) => {
    const isIso8601 = iso8601RegExp.test(value)

    if (!isIso8601) {
      throw new BadRequestException({
        code: ErrorCode.ValidationError,
        message: `"${key}" should be a valid ISO 8601 date string with timezone offset (e.g., +03:00, -05:00). "Z" is not allowed`,
      })
    }

    const dateObject = new Date(value)

    if (options.futureOnly && dateObject < new Date()) {
      throw new BadRequestException({
        code: ErrorCode.ValidationError,
        message: `"${key}" should be a future date`,
      })
    }

    return dateObject
  })
}

export default TransformIso8601String
