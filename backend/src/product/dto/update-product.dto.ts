import { Transform } from 'class-transformer';
import { IsString, IsNumber, IsOptional } from 'class-validator';

export class UpdateProductDto {
  @IsString()
  @IsOptional()
  name?: string;

  @Transform(({ value }) =>
    value !== undefined
      ? parseFloat(String(value).replace(',', '.'))
      : undefined,
  )
  @IsNumber()
  @IsOptional()
  base_price?: number;
}
