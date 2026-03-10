import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SaleProductItemService } from './sale-product-item.service';
import { SaleProductItemController } from './sale-product-item.controller';
import { SaleProductItem } from './entities/sale-product-item.entity';
import { Sale } from '../sale/entities/sale.entity';
import { ProductItem } from '../product-item/entities/product-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SaleProductItem, Sale, ProductItem])],
  controllers: [SaleProductItemController],
  providers: [SaleProductItemService],
})
export class SaleProductItemModule {}
