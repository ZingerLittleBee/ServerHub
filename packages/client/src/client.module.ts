import { Module } from '@nestjs/common'

import {
    kAuthService,
    kNatsServerUrl,
    kStorageService
} from '@server-octopus/shared'
import { ClientController } from '@/client.controller'
import { ClientService } from '@/client.service'
import { EventsGateway } from '@/gateway/events.gateway'
import { EventsService } from '@/gateway/events.service'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { DeviceModule } from '@/device/device.module'

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true
        }),
        DeviceModule,
        ClientsModule.registerAsync({
            isGlobal: true,
            clients: [
                {
                    name: kAuthService,
                    imports: [ConfigModule],
                    inject: [ConfigService],
                    useFactory: (configService: ConfigService) => ({
                        transport: Transport.NATS,
                        options: {
                            servers:
                                configService.get<string>(kNatsServerUrl) ??
                                kNatsServerUrl
                        }
                    })
                },
                {
                    name: kStorageService,
                    imports: [ConfigModule],
                    inject: [ConfigService],
                    useFactory: (configService: ConfigService) => ({
                        transport: Transport.NATS,
                        options: {
                            servers:
                                configService.get<string>(kNatsServerUrl) ??
                                kNatsServerUrl
                        }
                    })
                }
            ]
        })
    ],
    controllers: [ClientController],
    providers: [ClientService, EventsGateway, EventsService]
})
export class ClientModule {}
