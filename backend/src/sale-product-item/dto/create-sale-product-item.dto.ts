import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateSaleProductItemDto {
  @IsNotEmpty()
  @IsString()
  sale_id: string; 

  @IsNotEmpty()
  @IsString()
  product_item_id: string; 

  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsNotEmpty()
  @IsNumber()
  price: number;
}
