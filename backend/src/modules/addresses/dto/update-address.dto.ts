import { IsEmpty, IsNumber, IsString } from "class-validator";

export class UpdateAddressDto {
  @IsString()
  @IsEmpty()
  street?: string;

  @IsString()
  @IsEmpty()
  district?: string;

  @IsNumber()
  @IsEmpty()
  number?: number;

  @IsString()
  @IsEmpty()
  city?: string;

  @IsString()
  @IsEmpty()
  state?: string;

  @IsString()
  @IsEmpty()
  zipCode?: string;
}