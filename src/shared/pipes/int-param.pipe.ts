import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common'
import ErrorCode from '../types/enums/error-code.enum'

@Injectable()
class IntParamPipe implements PipeTransform {
  constructor(readonly name: string) {}

  transform(value: string, metadata: ArgumentMetadata) {
    const parsedValue = parseInt(value)

    if (Number.isNaN(parsedValue)) {
      throw new BadRequestException({
        code: ErrorCode.ValidationError,
        message: `The "${this.name}" param should be an integer`,
      })
    }

    return parsedValue
  }
}

export default IntParamPipe
