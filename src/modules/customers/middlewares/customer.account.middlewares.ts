import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class ValidateAccountCustomerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { valid } = req.headers;
    console.log(valid);
    console.log('ValidateAccountCustomer ');
    if (valid) {
      next();
    } else {
      console.log('valid is not found');
      res.status(401).send({ error: 'Account is invalid' });
    }
  }
}
