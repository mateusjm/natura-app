import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from 'typeorm';
import { Sale } from 'src/sale/entities/sale.entity';
import { ProductItem } from '../../product-item/entities/product-item.entity';

@Entity()
export class SaleProductItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Sale, (sale) => sale.items, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'sale_id' })
  sale: Sale;

  @ManyToOne(() => ProductItem, (productItem) => productItem.sales, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'product_item_id' })
  product_item: ProductItem;

  @Column()
  quantity: number;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;
}
