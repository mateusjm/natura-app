import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, MoreThanOrEqual, LessThan  } from 'typeorm';
import { Sale } from './entities/sale.entity';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { Client } from '../client/entities/client.entity';
import { SaleStatus } from './entities/sale.entity';

export type PeriodFilter = '1m' | '3m' | '6m' | '1y' | 'all';

@Injectable()
export class SaleService {
  constructor(
    @InjectRepository(Sale)
    private saleRepository: Repository<Sale>,

    @InjectRepository(Client)
    private clientRepository: Repository<Client>,
  ) {}

  // ----------------- CRUD -----------------
  async create(data: CreateSaleDto) {
    const client = await this.clientRepository.findOne({
      where: { id: data.client_id },
    });
    if (!client) throw new NotFoundException('Cliente não encontrado');

    const sale = this.saleRepository.create({ ...data, client });
    return this.saleRepository.save(sale);
  }

  findAll() {
    return this.saleRepository.find({
      relations: ['client'],
      order: { date: 'DESC' },
    });
  }

  async findOne(id: string) {
    const sale = await this.saleRepository.findOne({
      where: { id },
      relations: ['client', 'items'],
    });
    if (!sale) throw new NotFoundException('Venda não encontrada');
    return sale;
  }

  async update(id: string, updateSaleDto: UpdateSaleDto) {
    const sale = await this.findOne(id);
    if (updateSaleDto.client_id) {
      const client = await this.clientRepository.findOne({
        where: { id: updateSaleDto.client_id },
      });
      if (!client)
        throw new NotFoundException(
          `Cliente com ID: ${updateSaleDto.client_id} não existe`,
        );
      sale.client = client;
    }
    Object.assign(sale, updateSaleDto);
    return this.saleRepository.save(sale);
  }

  async remove(id: string) {
    const sale = await this.findOne(id);
    await this.saleRepository.delete(id);
    return sale;
  }

  // ----------------- Filtros por período -----------------
  private getStartDate(period: PeriodFilter): Date | undefined {
    const now = new Date();
    switch (period) {
      case '1m':
        return new Date(now.getFullYear(), now.getMonth() - 1, 1);
      case '3m':
        return new Date(now.getFullYear(), now.getMonth() - 3, 1);
      case '6m':
        return new Date(now.getFullYear(), now.getMonth() - 6, 1);
      case '1y':
        return new Date(now.getFullYear() - 1, now.getMonth(), 1);
      case 'all':
      default:
        return undefined;
    }
  }

  // ----------------- Estatísticas -----------------
  async getTotalSalesAmount(period: PeriodFilter = '1m') {
    const startDate = this.getStartDate(period);

    const sales = startDate
      ? await this.saleRepository.find({
          where: { date: Between(startDate, new Date()) },
        })
      : await this.saleRepository.find();

    const totalSalesAmount = sales.reduce(
      (acc, sale) => acc + Number(sale.totalPrice || 0),
      0,
    );

    return { totalSalesAmount };
  }

  async getTotalSalesProfit(period: PeriodFilter = '1m') {
    const startDate = this.getStartDate(period);

    const sales = startDate
      ? await this.saleRepository.find({
          where: { date: Between(startDate, new Date()) },
        })
      : await this.saleRepository.find();

    const totalSalesProfit = sales.reduce(
      (acc, sale) =>
        acc + (Number(sale.totalPrice || 0) - Number(sale.totalCost || 0)),
      0,
    );

    return { totalSalesProfit };
  }

  async getMonthlySalesStats(period: PeriodFilter = '1m') {
    const startDate = this.getStartDate(period);

    const sales = startDate
      ? await this.saleRepository.find({
          where: { date: Between(startDate, new Date()) },
          order: { date: 'ASC' },
        })
      : await this.saleRepository.find({ order: { date: 'ASC' } });

    const monthlyData: Record<
      string,
      { totalSalesAmount: number; totalSalesProfit: number }
    > = {};

    sales.forEach((sale) => {
      if (!sale.date) return;

      const monthKey = `${sale.date.getFullYear()}-${(sale.date.getMonth() + 1)
        .toString()
        .padStart(2, '0')}`;

      if (!monthlyData[monthKey]) {
        monthlyData[monthKey] = { totalSalesAmount: 0, totalSalesProfit: 0 };
      }

      monthlyData[monthKey].totalSalesAmount += Number(sale.totalPrice || 0);
      monthlyData[monthKey].totalSalesProfit +=
        Number(sale.totalPrice || 0) - Number(sale.totalCost || 0);
    });

    return Object.entries(monthlyData)
      .map(([month, data]) => ({
        month,
        totalSalesAmount: data.totalSalesAmount,
        totalSalesProfit: data.totalSalesProfit,
      }))
      .sort((a, b) => a.month.localeCompare(b.month));
  }

  async getPendingDueSales(limit = 10) {
    const today = new Date();

    const sales = await this.saleRepository.find({
      where: {
        status: SaleStatus.PENDENTE,
        deadline: MoreThanOrEqual(today),
      },
      relations: ['client'],
      order: { deadline: 'ASC' },
      take: limit,
    });

    return sales;
  }

  async getPendingOverdueSales(limit = 10) {
    const today = new Date();

    const sales = await this.saleRepository.find({
      where: {
        status: SaleStatus.PENDENTE,
        deadline: LessThan(today), // vendas que já passaram da data limite
      },
      relations: ['client'],
      order: { deadline: 'ASC' }, // opcional: as mais antigas primeiro
      take: limit,
    });

    return sales;
  }
}
