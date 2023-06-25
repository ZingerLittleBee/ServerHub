import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import {DbModule} from "@/db/db.module";
import {InfluxModule} from "@/influx/influx.module";
import {JwtModule} from "@nestjs/jwt";

@Module({
  imports: [DbModule,InfluxModule, JwtModule.register({})],
  controllers: [ClientController],
  providers: [ClientService]
})
export class ClientModule {}
