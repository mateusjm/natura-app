import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ProductItem } from '../../product-item/entities/product-item.entity';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  name: string;

  @Column('decimal', { precision: 10, scale: 2 })
  base_price: number;

  @OneToMany(() => ProductItem, (item) => item.product)
  items: ProductItem[];
}
