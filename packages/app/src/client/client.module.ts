import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import {DbModule} from "@/db/db.module";
import {InfluxModule} from "@/influx/influx.module";

@Module({
  imports: [DbModule,InfluxModule],
  controllers: [ClientController],
  providers: [ClientService]
})
export class ClientModule {}
