import { HttpException, HttpStatus } from '@nestjs/common';

export class NotFoundExceptions extends HttpException {
  constructor(msg?: string, status?: HttpStatus) {
    super(msg || 'User Not Found', status || HttpStatus.NOT_FOUND);
  }
}
