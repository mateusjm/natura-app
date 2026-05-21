import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { ProductItemService } from './product-item.service';
import { CreateProductItemDto } from './dto/create-product-item.dto';
import { UpdateProductItemDto } from './dto/update-product-item.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import type { JwtPayload } from '../auth/interfaces/jwt-payload.interface';

@UseGuards(JwtAuthGuard)
@Controller('product-item')
export class ProductItemController {
  constructor(private readonly productItemService: ProductItemService) {}

  @Post()
  create(
    @Body() createProductItemDto: CreateProductItemDto,
    @CurrentUser() user: JwtPayload,
  ) {
    const productItem = this.productItemService.create(
      createProductItemDto,
      user.sub,
    );

    return {
      ...productItem,
      message: 'Produto Item criado com sucesso!',
    };
  }

  @Get()
  findAll(@CurrentUser() user: JwtPayload) {
    return this.productItemService.findAll(user.sub);
  }

  @Get('total-stock-value')
  async getTotalStockValue(@CurrentUser() user: JwtPayload) {
    const totalValue = await this.productItemService.getTotalStockValue(
      user.sub,
    );
    return { totalStockValue: totalValue };
  }

  @Get('expiring')
  async getExpiringItems(@CurrentUser() user: JwtPayload) {
    return this.productItemService.findExpiringItems(user.sub);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser() user: JwtPayload) {
    return this.productItemService.findOne(id, user.sub);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDto: UpdateProductItemDto,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.productItemService.update(id, updateDto, user.sub);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @CurrentUser() user: JwtPayload) {
    await this.productItemService.remove(id, user.sub);
    return { message: 'Produto Item excluído com sucesso!' };
  }
}
