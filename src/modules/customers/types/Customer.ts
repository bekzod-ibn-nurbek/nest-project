import { CreateAddressDto } from '../dtos/createAddress.dto';

export interface Customer {
  _id: string;
  email: string;
  name: string;
  address: CreateAddressDto;
}
