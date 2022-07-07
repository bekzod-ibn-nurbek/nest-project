import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCustomerDto } from 'src/modules/customers/dtos/createCustomer.dto';
import { Customer } from 'src/modules/customers/types/Customer';

@Injectable()
export class CustomersService {
  private customers: Customer[] = [];
  constructor(
    @InjectModel('Customer') private readonly customerModel: Model<Customer>,
  ) {}

  getCustomer() {
    return this.customerModel.find().exec();
  }
  async getOneCustomer(id) {
    const customers = await this.customerModel.find().exec();
    const customer = customers.filter((item) => item.id === id);
    return customer;
  }
  async createCustomer(customerDto: CreateCustomerDto) {
    await this.customerModel.create(customerDto);
  }
}
