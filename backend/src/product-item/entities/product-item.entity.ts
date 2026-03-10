import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Product } from '../../product/entities/product.entity';
import { SaleProductItem } from '../../sale-product-item/entities/sale-product-item.entity';

@Entity()
export class ProductItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  quantity: number;

  @Column()
  validity: Date;

  @Column()
  entry_date: Date;

  @Column('decimal', { precision: 10, scale: 2 })
  cost: number;

  @ManyToOne(() => Product, (product) => product.items, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column()
  product_id: number;

  @OneToMany(
    () => SaleProductItem,
    (saleProductItem) => saleProductItem.product_item,
  )
  sales: SaleProductItem[];
}
