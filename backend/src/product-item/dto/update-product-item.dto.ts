import { Transform } from 'class-transformer';
import { IsNumber, IsDate, IsOptional } from 'class-validator';

export class UpdateProductItemDto {
  @Transform(({ value }) => Number(value))
  @IsOptional()
  @IsNumber()
  quantity?: number;

  @Transform(({ value }) => new Date(value))
  @IsOptional()
  @IsDate()
  validity?: Date;

  @Transform(({ value }) => new Date(value))
  @IsOptional()
  @IsDate()
  entry_date?: Date;

  @Transform(({ value }) => parseFloat(String(value).replace(',', '.')))
  @IsOptional()
  @IsNumber()
  cost?: number;

  @IsNumber()
  @IsOptional()
  product_id?: number;
}
