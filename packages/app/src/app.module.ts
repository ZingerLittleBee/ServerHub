import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {DbModule} from "./db/db.module";
import {UserModule} from "./user/user.module";
import { ClientModule } from './client/client.module';
import { AuthModule } from './auth/auth.module';
import {ConfigModule} from "@nestjs/config";
import { ProfileModule } from './profile/profile.module';
import { InfluxModule } from './influx/influx.module';

@Module({
  imports: [DbModule, UserModule, ClientModule, AuthModule,
    ConfigModule.forRoot({
      isGlobal: true
    }),
    ProfileModule,
    InfluxModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
