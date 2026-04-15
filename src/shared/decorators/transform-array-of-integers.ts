import { Transform } from 'class-transformer'
import { BadRequestException } from '@nestjs/common'
import { min } from 'rxjs'
import ErrorCode from '../types/enums/error-code.enum'

interface TransformArrayOfIntegersOptions {
  min?: number,
  max?: number,
}

const TransformArrayOfIntegers = (
  options: TransformArrayOfIntegersOptions = {},
) => {
  return Transform(({ key, value }) => {
    const { min, max } = options

    // Convert to array
    // And replace all empty string with undefined
    const array = (Array.isArray(value) ? value : [value])
      .map((item) => (item as string).trim())
      .map((item) => item.length ? item : undefined)
    
    // Number() convert undefined to NaN
    const numbers = array.map((id: string) => Number(id))
    
    // If NaN or not integer, throw an error
    const firstNonIntegerIndex = numbers.findIndex(
      (id) => Number.isNaN(id) || !Number.isInteger(id),
    )
    
    if (firstNonIntegerIndex !== -1) {
      throw new BadRequestException({
        code: ErrorCode.ValidationError,
        message: `All items in "${key}" should be integers`,
      })
    }

    // Validate against min and max
    if (min !== undefined && numbers.some((id) => id < min)) {
      throw new BadRequestException({
        code: ErrorCode.ValidationError,
        message: `All items in "${key}" should be greater than or equal to ${min}`,
      })
    }
    
    if (max !== undefined && numbers.some((id) => id > max)) {
      throw new BadRequestException({
        code: ErrorCode.ValidationError,
        message: `All items in "${key}" should be less than or equal to ${max}`,
      })
    }
    
    return numbers
  })
}

export default TransformArrayOfIntegers
