import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { ClientModule } from './client/client.module';
import { ProductItemModule } from './product-item/product-item.module';
import { SaleModule } from './sale/sale.module';
import { SaleProductItemModule } from './sale-product-item/sale-product-item.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT!),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    ProductModule,
    ClientModule,
    ProductItemModule,
    SaleModule,
    SaleProductItemModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
