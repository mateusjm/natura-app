import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SaleService } from './sale.service';
import { SaleController } from './sale.controller';
import { Sale } from './entities/sale.entity';
import { Client } from '../client/entities/client.entity';
import { JwtAuthGuardModule } from '../auth/jwt-auth-guard.module';

@Module({
  imports: [TypeOrmModule.forFeature([Sale, Client]), JwtAuthGuardModule],
  controllers: [SaleController],
  providers: [SaleService],
})
export class SaleModule {}
