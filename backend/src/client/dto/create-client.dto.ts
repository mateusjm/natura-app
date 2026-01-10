import { Transform } from 'class-transformer';
import { IsString } from 'class-validator';

export class CreateClientDto {
  @IsString()
  name: string;

  @Transform(({ value }) => String(value))
  @IsString()
  phone: string;
}