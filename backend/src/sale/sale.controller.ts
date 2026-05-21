import {
  Controller,
  Get,
  Query,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { SaleService } from './sale.service';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import type { JwtPayload } from '../auth/interfaces/jwt-payload.interface';

type PeriodFilter = '1m' | '3m' | '6m' | '1y' | 'all';

@UseGuards(JwtAuthGuard)
@Controller('sale')
export class SaleController {
  constructor(private readonly saleService: SaleService) {}

  @Post()
  async create(
    @Body() createSaleDto: CreateSaleDto,
    @CurrentUser() user: JwtPayload,
  ) {
    return await this.saleService.create(createSaleDto, user.sub);
  }

  @Get()
  findAll(@CurrentUser() user: JwtPayload) {
    return this.saleService.findAll(user.sub);
  }

  @Get('total-sales-amount')
  getTotalSalesAmount(
    @Query('period') period: PeriodFilter = '1m',
    @CurrentUser() user: JwtPayload,
  ) {
    return this.saleService.getTotalSalesAmount(user.sub, period);
  }

  @Get('total-sales-profit')
  getTotalSalesProfit(
    @Query('period') period: PeriodFilter = '1m',
    @CurrentUser() user: JwtPayload,
  ) {
    return this.saleService.getTotalSalesProfit(user.sub, period);
  }

  @Get('monthly-stats')
  getMonthlySalesStats(
    @Query('period') period: PeriodFilter = '1m',
    @CurrentUser() user: JwtPayload,
  ) {
    return this.saleService.getMonthlySalesStats(user.sub, period);
  }

  @Get('pending')
  async getPendingSales(
    @Query('limit') limit = 10,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.saleService.getPendingDueSales(user.sub, Number(limit));
  }

  @Get('overdue')
  async getPendingOverdueSales(
    @Query('limit') limit = 10,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.saleService.getPendingOverdueSales(user.sub, Number(limit));
  }

  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser() user: JwtPayload) {
    return this.saleService.findOne(id, user.sub);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSaleDto: UpdateSaleDto,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.saleService.update(id, updateSaleDto, user.sub);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser() user: JwtPayload) {
    return this.saleService.remove(id, user.sub);
  }
}
