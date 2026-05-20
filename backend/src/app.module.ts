import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ClientModule } from './client/client.module';
import { ProductItemModule } from './product-item/product-item.module';
import { ProductModule } from './product/product.module';
import { SaleProductItemModule } from './sale-product-item/sale-product-item.module';
import { SaleModule } from './sale/sale.module';
import { UserModule } from './user/user.module';

const dbHost = process.env.DB_HOST ?? '';
const useDbSsl =
  process.env.DB_SSL === 'true' || dbHost.includes('tidbcloud.com');
const dbSslOptions = useDbSsl
  ? ({ minVersion: 'TLSv1.2' } as const)
  : undefined;

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
      synchronize: process.env.NODE_ENV !== 'production',
      ...(dbSslOptions && {
        ssl: dbSslOptions,
        extra: {
          ssl: dbSslOptions,
        },
      }),
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
