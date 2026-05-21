import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { JwtAuthGuardModule } from '../auth/jwt-auth-guard.module';

@Module({
  imports: [TypeOrmModule.forFeature([Client]), JwtAuthGuardModule],
  controllers: [ClientController],
  providers: [ClientService],
})
export class ClientModule {}
