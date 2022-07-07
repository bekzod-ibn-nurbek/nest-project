import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class ValidateCustomerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('authorization token ');
    const { authorization } = req.headers;
    if (!authorization) {
      res.status(400).send({ msg: 'Authorization token does not provided' });
      console.log('Authorization token does not provided');
    } else if (authorization === '123') {
      next();
    } else {
      console.log('Authorization token is invalid');
    }
  }
}
