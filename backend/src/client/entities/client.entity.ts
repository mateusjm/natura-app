import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Sale } from '../../sale/entities/sale.entity';

@Entity()
export class Client {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  phone: string;

  @OneToMany(() => Sale, (sale) => sale.client)
  sales: Sale[];
}
