import { Transform } from 'class-transformer';
import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @Transform(({ value }) => parseFloat(String(value).replace(',', '.')))
  @IsNumber(
    { allowNaN: false },
    { message: 'base_price deve ser um número válido' },
  )
  base_price: number;
}
