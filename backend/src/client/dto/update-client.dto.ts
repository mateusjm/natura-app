import { Transform } from 'class-transformer';
import { IsString, IsNumber } from 'class-validator';

export class UpdateClientDto {
  @IsString()
  name?: string;

  @Transform(({ value }) => String(value))
  @IsNumber()
  phone?: string;
}
