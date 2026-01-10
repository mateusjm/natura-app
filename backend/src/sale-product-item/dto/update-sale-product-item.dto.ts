import { PartialType } from '@nestjs/mapped-types';
import { CreateSaleProductItemDto } from './create-sale-product-item.dto';

export class UpdateSaleProductItemDto extends PartialType(CreateSaleProductItemDto) {}
