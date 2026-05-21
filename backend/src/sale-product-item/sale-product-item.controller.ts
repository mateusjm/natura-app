import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Delete,
  Body,
  UseGuards,
} from '@nestjs/common';
import { SaleProductItemService } from './sale-product-item.service';
import { CreateSaleProductItemDto } from './dto/create-sale-product-item.dto';
import { UpdateSaleProductItemDto } from './dto/update-sale-product-item.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import type { JwtPayload } from '../auth/interfaces/jwt-payload.interface';

@UseGuards(JwtAuthGuard)
@Controller('sale-product-item')
export class SaleProductItemController {
  constructor(
    private readonly saleProductItemService: SaleProductItemService,
  ) {}

  @Get(':id')
  findOne(@Param('id') id: number, @CurrentUser() user: JwtPayload) {
    return this.saleProductItemService.findOne(Number(id), user.sub);
  }

  @Post()
  create(
    @Body() createDto: CreateSaleProductItemDto,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.saleProductItemService.create(createDto, user.sub);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateDto: UpdateSaleProductItemDto,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.saleProductItemService.update(Number(id), updateDto, user.sub);
  }

  @Delete(':id')
  remove(@Param('id') id: number, @CurrentUser() user: JwtPayload) {
    return this.saleProductItemService.remove(Number(id), user.sub);
  }
}
