import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '@/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        let expiresIn = '86400s';
        if (configService.get('JWT_EXPIRATION_TIME')) {
          expiresIn = `${configService.get('JWT_EXPIRATION_TIME')}s`;
        }
        return {
          secret: configService.get('JWT_SECRET'),
          signOptions: { expiresIn: expiresIn },
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
