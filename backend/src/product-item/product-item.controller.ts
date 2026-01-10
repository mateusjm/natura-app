import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Query,
} from '@nestjs/common';
import { ProductItemService } from './product-item.service';
import { CreateProductItemDto } from './dto/create-product-item.dto';
import { UpdateProductItemDto } from './dto/update-product-item.dto';

@Controller('product-item')
export class ProductItemController {
  constructor(private readonly productItemService: ProductItemService) {}

  @Post()
  create(@Body() createProductItemDto: CreateProductItemDto) {
    const productItem = this.productItemService.create(createProductItemDto);

    return {
      ...productItem,
      message: 'Produto Item criado com sucesso!',
    };
  }

  @Get()
  findAll() {
    return this.productItemService.findAll();
  }

  @Get('total-stock-value')
  async getTotalStockValue() {
    const totalValue = await this.productItemService.getTotalStockValue();
    return { totalStockValue: totalValue };
  }

  @Get('expiring')
  async getExpiringItems() {
    return this.productItemService.findExpiringItems();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productItemService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateProductItemDto) {
    return this.productItemService.update(id, updateDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.productItemService.remove(id);
    return { message: 'Produto Item excluído com sucesso!' };
  }
}
