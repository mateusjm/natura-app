import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Delete,
  Body,
} from '@nestjs/common';
import { SaleProductItemService } from './sale-product-item.service';
import { CreateSaleProductItemDto } from './dto/create-sale-product-item.dto';
import { UpdateSaleProductItemDto } from './dto/update-sale-product-item.dto';

@Controller('sale-product-item')
export class SaleProductItemController {
  constructor(
    private readonly saleProductItemService: SaleProductItemService,
  ) {}

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.saleProductItemService.findOne(Number(id));
  }

  @Post()
  create(@Body() createDto: CreateSaleProductItemDto) {
    return this.saleProductItemService.create(createDto);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateDto: UpdateSaleProductItemDto) {
    return this.saleProductItemService.update(Number(id), updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.saleProductItemService.remove(Number(id));
  }
}
