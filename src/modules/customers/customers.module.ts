import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomersController } from './customers.controller';
import { CustomerSchema } from './dtos/createCustomer.dto';
import { ValidateAccountCustomerMiddleware } from './middlewares/customer.account.middlewares';
import { ValidateCustomerMiddleware } from './middlewares/validate.customer.middleware';
import { CustomersService } from './customers.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Customer', schema: CustomerSchema }]),
  ],
  controllers: [CustomersController],
  providers: [CustomersService],
})
export class CustomersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ValidateCustomerMiddleware, ValidateAccountCustomerMiddleware)
      .exclude({ path: 'customers', method: RequestMethod.GET })
      .forRoutes(CustomersController);
  }
}
