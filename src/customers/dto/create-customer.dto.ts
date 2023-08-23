import { IsEmail, IsString, Length } from 'class-validator';

export class CreateCustomerDto {
  @IsString()
  @Length(3, 255)
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @Length(3, 255)
  address: string;
}
