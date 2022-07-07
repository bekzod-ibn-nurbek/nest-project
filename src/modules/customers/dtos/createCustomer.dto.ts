import { Type } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsNotEmptyObject,
  ValidateNested,
} from 'class-validator';
import mongoose from 'mongoose';
import { CreateAddressDto } from './CreateAddress.dto';

export const CustomerSchema = new mongoose.Schema({
  email: String,
  name: String,
  address: {
    line1: String,
    line2: String,
    zip: Number,
    code: String,
    city: String,
    state: String,
  },
});

export class CreateCustomerDto {
  _id: string;
  @IsEmail()
  email: string;
  @IsNotEmpty()
  name: string;
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => CreateAddressDto)
  address: CreateAddressDto;
}
