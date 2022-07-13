import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    console.log(exception.getResponse());
    console.log(exception.getStatus());
    console.log(exception);
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    response.send({
      statusCode: exception.getStatus(),
      message: exception.getResponse(),
    });
  }
}
