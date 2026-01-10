import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ProductItem } from 'src/product-item/entities/product-item.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('decimal', { precision: 10, scale: 2 })
  base_price: number;

  @OneToMany(() => ProductItem, (item) => item.product)
  items: ProductItem[];
}
