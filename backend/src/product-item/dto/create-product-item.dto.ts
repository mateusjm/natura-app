import { Transform } from 'class-transformer';
import { IsNumber, IsDate } from 'class-validator';

export class CreateProductItemDto {
  @Transform(({ value }) => Number(value))
  @IsNumber()
  quantity: number;

  @Transform(({ value }) => new Date(value))
  @IsDate()
  validity: Date;

  @Transform(({ value }) => new Date(value))
  @IsDate()
  entry_date: Date;

  @Transform(({ value }) => parseFloat(String(value).replace(',', '.')))
  @IsNumber()
  cost: number;

  @IsNumber()
  product_id: number;
}
