
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  ForbiddenException,
} from '@nestjs/common'
import { Request, Response } from 'express'
import ErrorCode from '../types/enums/error-code.enum'

@Catch(ForbiddenException)
class ForbiddenExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const status = exception.getStatus()

    response
      .status(status)
      .json({
        code: ErrorCode.Forbidden,
        message: 'You do not have a permission to access this resource',
      })
  }
}

export default ForbiddenExceptionFilter
