import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Client } from '../../client/entities/client.entity';
import { SaleProductItem } from '../../sale-product-item/entities/sale-product-item.entity';

export enum PaymentMethod {
  DINHEIRO = 'dinheiro',
  PIX = 'pix',
}

export enum SaleStatus {
  PENDENTE = 'pendente',
  PAGO = 'pago',
  CANCELADA = 'cancelada',
}

@Entity()
export class Sale {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  date: Date;

  @Column({ type: 'enum', enum: PaymentMethod })
  payment_method: PaymentMethod;

  @Column()
  deadline: Date;

  @Column('decimal', { precision: 10, scale: 2 })
  totalPrice: number;

  @Column('decimal', { precision: 10, scale: 2 })
  totalCost: number;

  @Column({ type: 'enum', enum: SaleStatus, default: SaleStatus.PENDENTE })
  status: SaleStatus;

  @ManyToOne(() => Client, (client) => client.sales, { eager: true })
  @JoinColumn({ name: 'client_id' })
  client: Client;

  @OneToMany(() => SaleProductItem, (saleProductItem) => saleProductItem.sale)
  items: SaleProductItem[];
}
