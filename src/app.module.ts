import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { CustomersModule } from './modules/customers/customers.module';
import { ProductsModule } from './modules/products/products.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    CustomersModule,
    ProductsModule,
    UsersModule,
    MongooseModule.forRoot(
      'mongodb+srv://bekzod:zEmJ8hJf54LYK5BC@cluster0.irhsn.mongodb.net/nestjs-demo?retryWrites=true&w=majority',
    ),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
