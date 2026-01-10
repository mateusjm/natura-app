import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SaleService } from './sale.service';
import { SaleController } from './sale.controller';
import { Sale } from './entities/sale.entity';
import { Client } from 'src/client/entities/client.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Sale, Client])],
  controllers: [SaleController],
  providers: [SaleService],
})
export class SaleModule {}
