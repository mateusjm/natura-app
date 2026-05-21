import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Match } from './dto/match.validator';
import { JwtAuthGuardModule } from './jwt-auth-guard.module';

@Module({
  imports: [
    UserModule,
    JwtAuthGuardModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '7d' },
      }),
      global: true,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, Match],
  exports: [JwtAuthGuardModule],
})
export class AuthModule {}
