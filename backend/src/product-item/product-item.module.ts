import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductItemService } from './product-item.service';
import { ProductItemController } from './product-item.controller';
import { ProductItem } from './entities/product-item.entity';
import { Product } from 'src/product/entities/product.entity';
import { SaleProductItem } from 'src/sale-product-item/entities/sale-product-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductItem, Product, SaleProductItem])],
  controllers: [ProductItemController],
  providers: [ProductItemService],
})
export class ProductItemModule {}
