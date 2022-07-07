import { CreateAddressDto } from '../dtos/CreateAddress.dto';

export interface Customer {
  _id: string;
  email: string;
  name: string;
  address: CreateAddressDto;
}
