import {
  Controller,
  Get,
  Query,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SaleService } from './sale.service';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';

type PeriodFilter = '1m' | '3m' | '6m' | '1y' | 'all';

@Controller('sale')
export class SaleController {
  constructor(private readonly saleService: SaleService) {}

  @Post()
  async create(@Body() createSaleDto: CreateSaleDto) {
    const sale = await this.saleService.create(createSaleDto);
    return sale;
  }

  @Get()
  findAll() {
    return this.saleService.findAll();
  }

  @Get('total-sales-amount')
  getTotalSalesAmount(@Query('period') period: PeriodFilter = '1m') {
    return this.saleService.getTotalSalesAmount(period);
  }

  @Get('total-sales-profit')
  getTotalSalesProfit(@Query('period') period: PeriodFilter = '1m') {
    return this.saleService.getTotalSalesProfit(period);
  }

  @Get('monthly-stats')
  getMonthlySalesStats(@Query('period') period: PeriodFilter = '1m') {
    return this.saleService.getMonthlySalesStats(period);
  }

  @Get('pending')
  async getPendingSales(@Query('limit') limit = 10) {
    return this.saleService.getPendingDueSales(Number(limit));
  }

  @Get('overdue')
  async getPendingOverdueSales(@Query('limit') limit = 10) {
    return this.saleService.getPendingOverdueSales(Number(limit));
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.saleService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSaleDto: UpdateSaleDto) {
    return this.saleService.update(id, updateSaleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.saleService.remove(id);
  }
}
