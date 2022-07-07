import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Response } from 'express';
import { CreateCustomerDto } from 'src/modules/customers/dtos/createCustomer.dto';
import { CustomersService } from 'src/modules/customers/customers.service';

@Controller('customers')
export class CustomersController {
  constructor(private customerService: CustomersService) {}
  @Get('')
  getCustomer() {
    return this.customerService.getCustomer();
  }

  @Get('/:id')
  async getCustomerId(@Param('id') id: string, @Res() res: Response) {
    const customer = await this.customerService.getOneCustomer(id);
    if (customer !== undefined) {
      res.send(customer);
    } else {
      res.status(400).send({
        statusCode: HttpStatus.BAD_REQUEST,
        msg: 'Sorry!!! Customer not found',
      });
    }
  }

  @Post('create')
  @UsePipes(ValidationPipe)
  createCustomer(@Body() createCustomerDto: CreateCustomerDto) {
    this.customerService.createCustomer(createCustomerDto);
  }
}
