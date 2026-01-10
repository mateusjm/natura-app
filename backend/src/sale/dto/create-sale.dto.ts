import { Transform, Type } from 'class-transformer';
import { IsEnum, IsDate, IsUUID, IsNumber } from 'class-validator';
import { PaymentMethod, SaleStatus } from '../entities/sale.entity';

export class CreateSaleDto {
  @Transform(({ value }) => new Date(value))
  @IsDate()
  date: Date;

  @IsEnum(PaymentMethod)
  payment_method: PaymentMethod;

  @Transform(({ value }) => new Date(value))
  @IsDate()
  deadline: Date;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  totalPrice: number;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  totalCost: number;

  @IsEnum(SaleStatus)
  status: SaleStatus;

  @IsUUID()
  client_id: string;
}
