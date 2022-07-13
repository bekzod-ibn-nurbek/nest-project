import { IsNotEmpty } from 'class-validator';
export class CreateAddressDto {
  @IsNotEmpty()
  line1: string;
  line2?: string;
  @IsNotEmpty()
  zip: number;
  @IsNotEmpty()
  code: string;
  @IsNotEmpty()
  city: string;
  @IsNotEmpty()
  state: string;
}
